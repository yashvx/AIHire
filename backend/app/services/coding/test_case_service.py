from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.interview import Interview
from app.models.coding_problem import CodingProblem
from app.models.coding_test_case import CodingTestCase
from app.schemas.coding_test_case import CodingTestCaseCreate


def create_test_case(
    test_case_data: CodingTestCaseCreate,
    current_user_id: int,
    db: Session
):
    problem = (
        db.query(CodingProblem)
        .join(Interview, CodingProblem.interview_id == Interview.id)
        .filter(
            CodingProblem.id == test_case_data.problem_id,
            Interview.user_id == current_user_id
        )
        .first()
    )

    if not problem:
        raise HTTPException(
            status_code=404,
            detail="Coding problem not found"
        )

    test_case = CodingTestCase(
        problem_id=test_case_data.problem_id,
        input_data=test_case_data.input_data,
        expected_output=test_case_data.expected_output,
        is_hidden=test_case_data.is_hidden
    )

    db.add(test_case)
    db.commit()
    db.refresh(test_case)

    return test_case
