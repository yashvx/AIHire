from sqlalchemy.orm import Session

from app.models.resume import Resume


def get_user_resumes(
    current_user_id: int,
    db: Session
):
    resumes = (
        db.query(Resume)
        .filter(Resume.user_id == current_user_id)
        .order_by(Resume.created_at.desc())
        .all()
    )

    return resumes
