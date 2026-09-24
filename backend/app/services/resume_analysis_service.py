from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.resume import Resume


def get_resume_analysis(
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

    parsed_data = resume.parsed_data or {}

    return {
        "resume_id": resume.id,
        "name": parsed_data.get("name"),
        "email": parsed_data.get("email"),
        "phone": parsed_data.get("phone"),
        "skills": parsed_data.get("skills", []),
        "education": parsed_data.get("education", []),
        "projects": parsed_data.get("projects", []),
        "experience": parsed_data.get("experience", [])
    }
