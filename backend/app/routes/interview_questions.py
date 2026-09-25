from app.services.interview_question_list_service import get_interview_questions
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.dependencies.auth import get_current_user
from app.schemas.interview_questions import (
    InterviewQuestionRequest,
    InterviewQuestionResponse
)
from app.services.ai.question_generator import generate_interview_questions


router = APIRouter(
    prefix="/interviews",
    tags=["Interview Questions"]
)


@router.post(
    "/questions",
    response_model=InterviewQuestionResponse
)
def generate_questions_endpoint(
    request: InterviewQuestionRequest,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return generate_interview_questions(
        request=request,
        current_user_id=current_user.id,
        db=db
    )

@router.get(
    "/{interview_id}/questions"
)
def get_questions(
    interview_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return get_interview_questions(
        interview_id=interview_id,
        current_user_id=current_user.id,
        db=db
    )
