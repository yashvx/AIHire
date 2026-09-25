from app.schemas.interview_report import InterviewReportResponse
from app.services.interview_report_service import get_interview_report
from app.services.ai.evaluate_interview_answer import evaluate_interview_answer
from app.schemas.interview_answer import InterviewAnswerRequest
from app.services.interview_answer_service import submit_interview_answer
from app.services.interview_question_list_service import get_interview_questions
from app.schemas.interview_evaluation import InterviewEvaluationRequest
from app.services.interview_evaluation_service import save_interview_evaluation
from app.schemas.interview_evaluation import InterviewEvaluationResponse
from app.services.interview_evaluation_service import create_interview_evaluation
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.dependencies.auth import get_current_user
from app.schemas.interview_questions import (
    InterviewQuestionRequest,
    InterviewQuestionResponse
)
from app.services.ai.question_generator import generate_interview_questions
from app.services.adaptive_interview_service import create_adaptive_next_question


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

@router.post(
    "/questions/{question_id}/answer"
)
def submit_answer(
    question_id: int,
    answer_data: InterviewAnswerRequest,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return submit_interview_answer(
        question_id=question_id,
        current_user_id=current_user.id,
        answer=answer_data.answer,
        db=db
    )


@router.post(
    "/questions/{question_id}/evaluate"
)
def evaluate_answer(
    question_id: int,
    evaluation_data: InterviewEvaluationRequest,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return save_interview_evaluation(
        question_id=question_id,
        current_user_id=current_user.id,
        technical_score=evaluation_data.technical_score,
        communication_score=evaluation_data.communication_score,
        relevance_score=evaluation_data.relevance_score,
        overall_score=evaluation_data.overall_score,
        feedback=evaluation_data.feedback,
        db=db
    )


@router.post(
    "/questions/{question_id}/ai-evaluate"
)
def ai_evaluate_answer(
    question_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return evaluate_interview_answer(
        question_id=question_id,
        current_user_id=current_user.id,
        db=db
    )


@router.post(
    "/{interview_id}/adaptive-next-question"
)
def adaptive_next_question(
    interview_id: int,
    current_question_order: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return create_adaptive_next_question(
        interview_id=interview_id,
        current_question_order=current_question_order,
        current_user_id=current_user.id,
        db=db
    )


@router.post(
    "/{interview_id}/evaluation",
    response_model=InterviewEvaluationResponse
)
def evaluate_interview(
    interview_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return create_interview_evaluation(
        interview_id=interview_id,
        current_user_id=current_user.id,
        db=db
    )


@router.get(
    "/{interview_id}/report",
    response_model=InterviewReportResponse
)
def interview_report(
    interview_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return get_interview_report(
        interview_id=interview_id,
        current_user_id=current_user.id,
        db=db
    )
