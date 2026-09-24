from sqlalchemy.orm import Session

from app.models.interview import Interview


def get_user_interviews(
    current_user_id: int,
    db: Session
):
    interviews = (
        db.query(Interview)
        .filter(Interview.user_id == current_user_id)
        .order_by(Interview.created_at.desc())
        .all()
    )

    return interviews
