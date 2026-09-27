from pathlib import Path
from uuid import uuid4

from fastapi import HTTPException, UploadFile
from sqlalchemy.orm import Session

from app.models.interview import Interview
from app.models.interview_question import InterviewQuestion


VOICE_STORAGE_DIR = Path("storage/voice")

ALLOWED_AUDIO_TYPES = {
    "audio/mpeg": ".mp3",
    "audio/wav": ".wav",
    "audio/x-wav": ".wav",
    "audio/mp4": ".m4a",
    "audio/webm": ".webm",
}


def save_voice_answer(
    interview_id: int,
    question_order: int,
    current_user_id: int,
    audio_file: UploadFile,
    db: Session
):
    interview = (
        db.query(Interview)
        .filter(
            Interview.id == interview_id,
            Interview.user_id == current_user_id
        )
        .first()
    )

    if not interview:
        raise HTTPException(
            status_code=404,
            detail="Interview not found"
        )

    if interview.status == "completed":
        raise HTTPException(
            status_code=400,
            detail="Interview is already completed"
        )

    if interview.status != "in_progress":
        raise HTTPException(
            status_code=400,
            detail="Interview has not been started"
        )

    question = (
        db.query(InterviewQuestion)
        .filter(
            InterviewQuestion.interview_id == interview_id,
            InterviewQuestion.question_order == question_order
        )
        .first()
    )

    if not question:
        raise HTTPException(
            status_code=404,
            detail="Question not found"
        )

    if audio_file.content_type not in ALLOWED_AUDIO_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Unsupported audio format"
        )

    VOICE_STORAGE_DIR.mkdir(
        parents=True,
        exist_ok=True
    )

    extension = ALLOWED_AUDIO_TYPES[audio_file.content_type]

    filename = f"{uuid4().hex}{extension}"

    file_path = VOICE_STORAGE_DIR / filename

    audio_data = audio_file.file.read()

    if not audio_data:
        raise HTTPException(
            status_code=400,
            detail="Audio file is empty"
        )

    with open(file_path, "wb") as buffer:
        buffer.write(audio_data)

    return {
        "interview_id": interview_id,
        "question_id": question.id,
        "question_order": question_order,
        "filename": filename,
        "file_path": str(file_path),
        "content_type": audio_file.content_type,
        "message": "Voice answer uploaded successfully"
    }
