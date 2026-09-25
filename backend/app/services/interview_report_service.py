from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.interview import Interview
from app.models.interview_question import InterviewQuestion
from app.models.interview_evaluation import InterviewEvaluation


def get_interview_report(
    interview_id: int,
    current_user_id: int,
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

    questions = (
        db.query(InterviewQuestion)
        .filter(
            InterviewQuestion.interview_id == interview_id
        )
        .order_by(InterviewQuestion.id)
        .all()
    )

    evaluation = (
        db.query(InterviewEvaluation)
        .filter(
            InterviewEvaluation.interview_id == interview_id
        )
        .first()
    )

    return {
        "interview_id": interview.id,
        "company": interview.company,
        "interview_type": interview.interview_type,
        "status": interview.status,

        "overall_score": (
            evaluation.overall_score
            if evaluation
            else None
        ),

        "technical_score": (
            evaluation.technical_score
            if evaluation
            else None
        ),

        "communication_score": (
            evaluation.communication_score
            if evaluation
            else None
        ),

        "relevance_score": (
            evaluation.relevance_score
            if evaluation
            else None
        ),

        "summary": (
            evaluation.summary
            if evaluation
            else None
        ),

        "strengths": (
            evaluation.strengths
            if evaluation
            else None
        ),

        "areas_to_improve": (
            evaluation.areas_to_improve
            if evaluation
            else None
        ),

        "created_at": interview.created_at,

        "questions": [
            {
                "id": question.id,
                "question": question.question,
                "category": question.category,
                "difficulty": question.difficulty,
                "answer": question.answer,
                "technical_score": question.technical_score,
                "communication_score": question.communication_score,
                "relevance_score": question.relevance_score,
                "overall_score": question.overall_score,
                "feedback": question.feedback
            }
            for question in questions
        ]
    }
