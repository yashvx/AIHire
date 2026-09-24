from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.resume import Resume
from app.schemas.interview_questions import InterviewQuestionRequest


def generate_questions(
    resume_text: str,
    company: str,
    interview_type: str
):
    questions = [
        f"Tell me about your experience relevant to {company}.",
        f"Explain one important project from your resume.",
        f"What technical skills from your resume are most relevant to a {interview_type} interview?",
        "Describe a challenging problem you faced in one of your projects and how you solved it.",
        "What would you improve in one of the projects mentioned in your resume?"
    ]

    return questions


def generate_interview_questions(
    request: InterviewQuestionRequest,
    current_user_id: int,
    db: Session
):
    resume = (
        db.query(Resume)
        .filter(
            Resume.id == request.resume_id,
            Resume.user_id == current_user_id
        )
        .first()
    )

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    questions = generate_questions(
        resume_text=resume.resume_text or "",
        company=request.company,
        interview_type=request.interview_type
    )

    return {
        "questions": questions
    }
