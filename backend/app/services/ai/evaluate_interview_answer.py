from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.interview_question import InterviewQuestion
from app.models.interview import Interview
from app.services.ai.answer_evaluator import evaluate_answer
from app.services.ai.adaptive_interview import analyze_answer_for_adaptation


def evaluate_interview_answer(
    question_id: int,
    current_user_id: int,
    db: Session
):
    question = (
        db.query(InterviewQuestion)
        .join(
            Interview,
            Interview.id == InterviewQuestion.interview_id
        )
        .filter(
            InterviewQuestion.id == question_id,
            Interview.user_id == current_user_id
        )
        .first()
    )

    if not question:
        raise HTTPException(
            status_code=404,
            detail="Interview question not found"
        )

    if not question.answer:
        raise HTTPException(
            status_code=400,
            detail="Answer not found"
        )

    evaluation = evaluate_answer(
        question=question.question,
        answer=question.answer
    )

    question.technical_score = evaluation["technical_score"]
    question.communication_score = evaluation["communication_score"]
    question.relevance_score = evaluation["relevance_score"]
    question.overall_score = evaluation["overall_score"]
    question.feedback = evaluation["feedback"]

    adaptation = analyze_answer_for_adaptation(
        technical_score=evaluation["technical_score"],
        communication_score=evaluation["communication_score"],
        relevance_score=evaluation["relevance_score"],
        overall_score=evaluation["overall_score"]
    )

    db.commit()
    db.refresh(question)

    return {
        "question": question,
        "adaptation": adaptation
    }
