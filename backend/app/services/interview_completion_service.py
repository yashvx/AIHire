from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.interview import Interview


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

    interview.status = "completed"

    db.commit()
    db.refresh(interview)

    return interview
