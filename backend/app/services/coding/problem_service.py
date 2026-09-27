from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.interview import Interview
from app.models.coding_problem import CodingProblem
from app.schemas.coding_problem import CodingProblemCreate


def create_coding_problem(
    problem_data: CodingProblemCreate,
    current_user_id: int,
    db: Session
):
    interview = (
        db.query(Interview)
        .filter(
            Interview.id == problem_data.interview_id,
            Interview.user_id == current_user_id
        )
        .first()
    )

    if not interview:
        raise HTTPException(
            status_code=404,
            detail="Interview not found"
        )

    problem = CodingProblem(
        interview_id=problem_data.interview_id,
        title=problem_data.title,
        description=problem_data.description,
        difficulty=problem_data.difficulty,
        starter_code=problem_data.starter_code,
        expected_language=problem_data.expected_language
    )

    db.add(problem)
    db.commit()
    db.refresh(problem)

    return problem

