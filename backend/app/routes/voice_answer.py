from fastapi import APIRouter, Depends, File, UploadFile
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.dependencies.auth import get_current_user
from app.services.voice_answer_service import save_voice_answer


router = APIRouter(
    prefix="/interviews",
    tags=["Voice Interview"]
)


@router.post(
    "/{interview_id}/questions/{question_order}/voice-answer"
)
def upload_voice_answer(
    interview_id: int,
    question_order: int,
    audio_file: UploadFile = File(...),
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return save_voice_answer(
        interview_id=interview_id,
        question_order=question_order,
        current_user_id=current_user.id,
        audio_file=audio_file,
        db=db
    )
