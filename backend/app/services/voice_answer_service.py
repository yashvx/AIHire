from pathlib import Path
from uuid import uuid4

from fastapi import HTTPException, UploadFile
from sqlalchemy.orm import Session

from app.models.interview import Interview
from app.models.interview_question import InterviewQuestion
from app.services.voice.speech_to_text import transcribe_audio
from app.services.ai.answer_evaluator import evaluate_answer
from app.services.ai.adaptive_interview import analyze_answer_for_adaptation
from app.services.adaptive_interview_service import create_adaptive_next_question


VOICE_STORAGE_DIR = Path("storage/voice")
MAX_INTERVIEW_QUESTIONS = 8

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

    try:
        transcript = transcribe_audio(str(file_path))
    except Exception as exc:
        raise HTTPException(
            status_code=502,
            detail=str(exc)
        )

    question.transcript = transcript
    question.answer = transcript

    evaluation = evaluate_answer(
        question.question,
        transcript
    )

    question.technical_score = evaluation["technical_score"]
    question.communication_score = evaluation["communication_score"]
    question.relevance_score = evaluation["relevance_score"]
    question.overall_score = evaluation["overall_score"]
    question.feedback = evaluation["feedback"]

    adaptation = analyze_answer_for_adaptation(
        technical_score=question.technical_score,
        communication_score=question.communication_score,
        relevance_score=question.relevance_score,
        overall_score=question.overall_score
    )

    adaptive_result = None

    if question_order >= MAX_INTERVIEW_QUESTIONS:
        interview.status = "completed"
    else:
        adaptive_result = create_adaptive_next_question(
            interview_id=interview_id,
            current_question_order=question_order,
            current_user_id=current_user_id,
            db=db
        )

    db.commit()
    db.refresh(question)

    return {
        "interview_id": interview_id,
        "question_id": question.id,
        "question_order": question_order,
        "filename": filename,
        "file_path": str(file_path),
        "content_type": audio_file.content_type,
        "transcript": question.transcript,
        "technical_score": question.technical_score,
        "communication_score": question.communication_score,
        "relevance_score": question.relevance_score,
        "overall_score": question.overall_score,
        "feedback": question.feedback,
        "adaptation": adaptation,
        "next_question": adaptive_result["question"] if adaptive_result else None,
        "message": "Voice answer evaluated successfully"
    }
