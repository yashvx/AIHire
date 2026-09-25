from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.services.interview_completion_service import complete_interview
from app.services.interview_start_service import start_interview
from app.services.next_question_service import get_next_question
from app.services.session_answer_service import submit_session_answer


from app.database.database import get_db
from app.dependencies.auth import get_current_user
from app.schemas.interview import InterviewCreate, InterviewResponse
from app.schemas.interview_list import InterviewListResponse
from app.services.interview_service import create_interview
from app.services.interview_list_service import get_user_interviews
from app.schemas.current_question import CurrentQuestionResponse
from app.services.current_question_service import get_current_question
from app.schemas.next_question import NextQuestionResponse
from app.schemas.session_answer import SessionAnswerRequest
from app.schemas.session_answer_response import SessionAnswerResponse



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



@router.post(
    "/{interview_id}/complete",
    response_model=InterviewResponse
)
def complete_interview_endpoint(
    interview_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return complete_interview(
        interview_id=interview_id,
        current_user_id=current_user.id,
        db=db
    )


@router.post(
    "/{interview_id}/start",
    response_model=InterviewResponse
)
def start_interview_endpoint(
    interview_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return start_interview(
        interview_id=interview_id,
        current_user_id=current_user.id,
        db=db
    )

@router.get(
    "/{interview_id}/questions/{question_order}",
    response_model=CurrentQuestionResponse
)
def current_question(
    interview_id: int,
    question_order: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return get_current_question(
        interview_id=interview_id,
        question_order=question_order,
        current_user_id=current_user.id,
        db=db
    )


@router.get(
    "/{interview_id}/questions/{question_order}/next",
    response_model=NextQuestionResponse
)
def next_question(
    interview_id: int,
    question_order: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return get_next_question(
        interview_id=interview_id,
        current_question_order=question_order,
        current_user_id=current_user.id,
        db=db
    )


@router.post(
    "/{interview_id}/questions/{question_order}/answer",
    response_model=SessionAnswerResponse
)
def submit_session_question_answer(
    interview_id: int,
    question_order: int,
    request: SessionAnswerRequest,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return submit_session_answer(
        interview_id=interview_id,
        question_order=question_order,
        current_user_id=current_user.id,
        answer=request.answer,
        db=db
    )
