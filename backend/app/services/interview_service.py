from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.interview import Interview
from app.models.resume import Resume
from app.schemas.interview import InterviewCreate


def create_interview(
    interview_data: InterviewCreate,
    current_user_id: int,
    db: Session
):
    resume = (
        db.query(Resume)
        .filter(
            Resume.id == interview_data.resume_id,
            Resume.user_id == current_user_id
        )
        .first()
    )

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    interview = Interview(
        user_id=current_user_id,
        resume_id=interview_data.resume_id,
        company=interview_data.company,
        role=interview_data.role,
        interview_type=interview_data.interview_type,
        status="created"
    )

    db.add(interview)
    db.commit()
    db.refresh(interview)

    return interview
