
from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.interview import Interview
from app.models.interview_question import InterviewQuestion
from app.services.ai.adaptive_interview import analyze_answer_for_adaptation
from app.services.ai.adaptive_question_generator import generate_adaptive_question
from app.services.adaptive_question_service import save_adaptive_question


def create_adaptive_next_question(
    interview_id: int,
    current_question_order: int,
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

    current_question = (
        db.query(InterviewQuestion)
        .filter(
            InterviewQuestion.interview_id == interview_id,
            InterviewQuestion.question_order == current_question_order
        )
        .first()
    )

    if not current_question:
        raise HTTPException(
            status_code=404,
            detail="Current question not found"
        )

    if current_question.overall_score is None:
        raise HTTPException(
            status_code=400,
            detail="Current question has not been evaluated"
        )

    adaptation = analyze_answer_for_adaptation(
        technical_score=current_question.technical_score,
        communication_score=current_question.communication_score,
        relevance_score=current_question.relevance_score,
        overall_score=current_question.overall_score
    )

    adaptive_question = generate_adaptive_question(
        company=interview.company,
        role=interview.role or "the target role",
        interview_type=interview.interview_type,
        previous_question=current_question.question,
        focus_areas=adaptation["focus_areas"],
        difficulty=adaptation["next_difficulty"]
    )

    saved_question = save_adaptive_question(
        interview_id=interview_id,
        current_question_order=current_question_order,
        current_user_id=current_user_id,
        question_data=adaptive_question,
        db=db
    )

    return {
        "adaptation": adaptation,
        "question": {
            "id": saved_question.id,
            "question_order": saved_question.question_order,
            "question": saved_question.question,
            "category": saved_question.category,
            "difficulty": saved_question.difficulty,
            "source": saved_question.source,
            "is_adaptive": saved_question.is_adaptive
        }
    }

