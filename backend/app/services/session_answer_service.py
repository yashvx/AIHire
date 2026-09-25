from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.interview import Interview
from app.models.interview_question import InterviewQuestion


def submit_session_answer(
    interview_id: int,
    question_order: int,
    current_user_id: int,
    answer: str,
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

    question.answer = answer

    next_question = (
        db.query(InterviewQuestion)
        .filter(
            InterviewQuestion.interview_id == interview_id,
            InterviewQuestion.question_order == question_order + 1
        )
        .first()
    )

    if not next_question:
        interview.status = "completed"

    db.commit()
    db.refresh(question)

    return {
    "question_id": question.id,
    "question_order": question.question_order,
    "answer": question.answer,
    "next_question_order": (
        next_question.question_order
        if next_question
        else None
    ),
    "interview_status": interview.status
}
