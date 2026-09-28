from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.interview import Interview
from app.models.interview_question import InterviewQuestion


def complete_interview(
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

    if interview.status == "completed":
        return interview

    questions = (
        db.query(InterviewQuestion)
        .filter(
            InterviewQuestion.interview_id == interview_id
        )
        .all()
    )

    if not questions:
        raise HTTPException(
            status_code=400,
            detail="Interview has no questions"
        )

    unevaluated_questions = [
        question
        for question in questions
        if question.overall_score is None
    ]

    if unevaluated_questions:
        raise HTTPException(
            status_code=400,
            detail="Not all interview questions have been evaluated"
        )

    interview.status = "completed"

    db.commit()
    db.refresh(interview)

    return interview
