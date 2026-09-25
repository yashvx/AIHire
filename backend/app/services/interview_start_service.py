from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.interview import Interview


def start_interview(
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
        raise HTTPException(
            status_code=400,
            detail="Interview is already completed"
        )

    interview.status = "in_progress"

    db.commit()
    db.refresh(interview)

    return interview
