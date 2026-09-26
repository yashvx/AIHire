from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.dependencies.auth import get_current_user
from app.schemas.recommendation import RecommendationResponse
from app.services.recommendation_service import get_user_recommendations


router = APIRouter(
    prefix="/recommendations",
    tags=["Recommendations"]
)


@router.get(
    "",
    response_model=RecommendationResponse
)
def get_recommendations(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return get_user_recommendations(
        current_user_id=current_user.id,
        db=db
    )
