from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.resume import Resume


def get_resume_detail(
    resume_id: int,
    current_user_id: int,
    db: Session
):
    resume = (
        db.query(Resume)
        .filter(
            Resume.id == resume_id,
            Resume.user_id == current_user_id
        )
        .first()
    )

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    return resume
