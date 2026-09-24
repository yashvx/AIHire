from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.dependencies.auth import get_current_user
from app.schemas.interview import InterviewCreate, InterviewResponse
from app.schemas.interview_list import InterviewListResponse
from app.services.interview_service import create_interview
from app.services.interview_list_service import get_user_interviews


router = APIRouter(
    prefix="/interviews",
    tags=["Interviews"]
)


@router.post(
    "",
    response_model=InterviewResponse
)
def create_new_interview(
    interview_data: InterviewCreate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return create_interview(
        interview_data=interview_data,
        current_user_id=current_user.id,
        db=db
    )


@router.get("", response_model=list[InterviewListResponse])
def list_interviews(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return get_user_interviews(current_user.id, db)
