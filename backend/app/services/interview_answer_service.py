from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.interview_question import InterviewQuestion
from app.models.interview import Interview


def submit_interview_answer(
    question_id: int,
    current_user_id: int,
    answer: str,
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

    question.answer = answer

    db.commit()
    db.refresh(question)

    return question
