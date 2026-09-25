from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.interview_question import InterviewQuestion
from app.models.interview import Interview


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

