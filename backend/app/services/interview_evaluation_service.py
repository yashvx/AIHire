from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.interview import Interview
from app.models.interview_question import InterviewQuestion
from app.models.interview_evaluation import InterviewEvaluation


def save_interview_evaluation(
    question_id: int,
    current_user_id: int,
    technical_score: int,
    communication_score: int,
    relevance_score: int,
    overall_score: int,
    feedback: str,
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

    question.technical_score = technical_score
    question.communication_score = communication_score
    question.relevance_score = relevance_score
    question.overall_score = overall_score
    question.feedback = feedback

    db.commit()
    db.refresh(question)

    return question


def create_interview_evaluation(
    interview_id: int,
    current_user_id: int,
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

    existing_evaluation = (
        db.query(InterviewEvaluation)
        .filter(
            InterviewEvaluation.interview_id == interview_id
        )
        .first()
    )

    if existing_evaluation:
        return existing_evaluation

    questions = (
        db.query(InterviewQuestion)
        .filter(
            InterviewQuestion.interview_id == interview_id
        )
        .all()
    )

    evaluated_questions = [
        question
        for question in questions
        if question.overall_score is not None
    ]

    if len(evaluated_questions) != len(questions):
        raise HTTPException(
            status_code=400,
            detail="Not all interview questions have been evaluated"
        )

    if not evaluated_questions:
        raise HTTPException(
            status_code=400,
            detail="No evaluated questions found"
        )

    technical_score = round(
        sum(
            question.technical_score
            for question in evaluated_questions
        ) / len(evaluated_questions)
    )

    communication_score = round(
        sum(
            question.communication_score
            for question in evaluated_questions
        ) / len(evaluated_questions)
    )

    relevance_score = round(
        sum(
            question.relevance_score
            for question in evaluated_questions
        ) / len(evaluated_questions)
    )

    overall_score = round(
        sum(
            question.overall_score
            for question in evaluated_questions
        ) / len(evaluated_questions)
    )

    evaluation = InterviewEvaluation(
        interview_id=interview_id,
        overall_score=overall_score,
        technical_score=technical_score,
        communication_score=communication_score,
        relevance_score=relevance_score,
        summary=(
            f"Interview evaluated across "
            f"{len(evaluated_questions)} question(s)."
        ),
        strengths=(
            "Evaluation data is available for "
            "technical, communication, and relevance performance."
        ),
        areas_to_improve=(
            "Continue improving areas with lower "
            "question-level scores."
        )
    )

    db.add(evaluation)
    db.commit()
    db.refresh(evaluation)

    return evaluation
