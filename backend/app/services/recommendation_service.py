from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.interview import Interview
from app.models.interview_evaluation import InterviewEvaluation
from app.services.ai.recommendation_engine import generate_recommendations


def get_user_recommendations(
    current_user_id: int,
    db: Session
):
    evaluations = (
        db.query(InterviewEvaluation)
        .join(
            Interview,
            Interview.id == InterviewEvaluation.interview_id
        )
        .filter(
            Interview.user_id == current_user_id,
            Interview.status == "completed"
        )
        .order_by(InterviewEvaluation.created_at)
        .all()
    )

    if not evaluations:
        raise HTTPException(
            status_code=404,
            detail="No completed interview evaluations found"
        )

    recommendations = generate_recommendations(
        evaluations=evaluations
    )

    return {
        "recommendations": recommendations
    }
