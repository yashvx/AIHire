from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.interview import Interview
from app.models.coding_problem import CodingProblem
from app.models.coding_submission import CodingSubmission
from app.schemas.coding_submission import CodingSubmissionCreate


def create_submission(
    submission_data: CodingSubmissionCreate,
    current_user_id: int,
    db: Session
):
    problem = (
        db.query(CodingProblem)
        .join(Interview, CodingProblem.interview_id == Interview.id)
        .filter(
            CodingProblem.id == submission_data.problem_id,
            Interview.user_id == current_user_id
        )
        .first()
    )

    if not problem:
        raise HTTPException(
            status_code=404,
            detail="Coding problem not found"
        )

    if submission_data.language.lower() != problem.expected_language.lower():
        raise HTTPException(
            status_code=400,
            detail=f"Expected language is {problem.expected_language}"
        )

    submission = CodingSubmission(
        problem_id=submission_data.problem_id,
        user_id=current_user_id,
        code=submission_data.code,
        language=submission_data.language,
        status="submitted",
        passed=None,
        score=None,
        execution_time=None,
        feedback=None
    )

    db.add(submission)
    db.commit()
    db.refresh(submission)

    return submission
