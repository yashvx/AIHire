from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.interview import Interview
from app.models.interview_question import InterviewQuestion
from app.services.ai.answer_evaluator import evaluate_answer
from app.services.adaptive_interview_service import create_adaptive_next_question


MAX_INTERVIEW_QUESTIONS = 8


def submit_session_answer(
    interview_id: int,
    question_order: int,
    current_user_id: int,
    answer: str,
    db: Session
):
    interview = (
        db.query(Interview)
        .filter(
            Interview.id == interview_id,
            Interview.user_id == current_user_id
        )
        .first()
    )

    if not interview:
        raise HTTPException(
            status_code=404,
            detail="Interview not found"
        )

    if interview.status == "completed":
        raise HTTPException(
            status_code=400,
            detail="Interview is already completed"
        )

    if interview.status != "in_progress":
        raise HTTPException(
            status_code=400,
            detail="Interview has not been started"
        )

    question = (
        db.query(InterviewQuestion)
        .filter(
            InterviewQuestion.interview_id == interview_id,
            InterviewQuestion.question_order == question_order
        )
        .first()
    )

    if not question:
        raise HTTPException(
            status_code=404,
            detail="Question not found"
        )

    question.answer = answer

    evaluation = evaluate_answer(
        question.question,
        answer
    )

    question.technical_score = evaluation["technical_score"]
    question.communication_score = evaluation["communication_score"]
    question.relevance_score = evaluation["relevance_score"]
    question.overall_score = evaluation["overall_score"]
    question.feedback = evaluation["feedback"]

    db.commit()
    db.refresh(question)

    if question_order >= MAX_INTERVIEW_QUESTIONS:
        interview.status = "completed"
        db.commit()
        db.refresh(interview)

        return {
            "question_id": question.id,
            "question_order": question.question_order,
            "answer": question.answer,
            "technical_score": question.technical_score,
            "communication_score": question.communication_score,
            "relevance_score": question.relevance_score,
            "overall_score": question.overall_score,
            "feedback": question.feedback,
            "adaptation": {
                "focus_areas": [],
                "next_difficulty": "none"
            },
            "next_question": None,
            "next_question_order": None,
            "interview_status": interview.status
        }

    adaptive_result = create_adaptive_next_question(
        interview_id=interview_id,
        current_question_order=question_order,
        current_user_id=current_user_id,
        db=db
    )

    next_question = (
        db.query(InterviewQuestion)
        .filter(
            InterviewQuestion.interview_id == interview_id,
            InterviewQuestion.question_order == question_order + 1
        )
        .first()
    )

    return {
        "question_id": question.id,
        "question_order": question.question_order,
        "answer": question.answer,
        "technical_score": question.technical_score,
        "communication_score": question.communication_score,
        "relevance_score": question.relevance_score,
        "overall_score": question.overall_score,
        "feedback": question.feedback,
        "adaptation": adaptive_result["adaptation"],
        "next_question": adaptive_result["question"],
        "next_question_order": (
            next_question.question_order
            if next_question
            else None
        ),
        "interview_status": interview.status
    }
