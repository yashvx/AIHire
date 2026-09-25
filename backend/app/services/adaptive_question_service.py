
from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.interview import Interview
from app.models.interview_question import InterviewQuestion


def save_adaptive_question(
    interview_id: int,
    current_question_order: int,
    current_user_id: int,
    question_data: dict,
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

    existing_question = (
        db.query(InterviewQuestion)
        .filter(
            InterviewQuestion.interview_id == interview_id,
            InterviewQuestion.question_order == current_question_order + 1
        )
        .first()
    )

    if existing_question:
        return existing_question

    adaptive_question = InterviewQuestion(
        interview_id=interview_id,
        question_order=current_question_order + 1,
        question=question_data["question"],
        category=question_data["category"],
        difficulty=question_data["difficulty"],
        source=question_data["source"],
        is_adaptive=True
    )

    db.add(adaptive_question)
    db.commit()
    db.refresh(adaptive_question)

    return adaptive_question

