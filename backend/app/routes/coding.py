from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.services.coding.evaluation_service import evaluate_submission
from app.database.database import get_db
from app.schemas.coding_problem import CodingProblemCreate
from app.schemas.coding_test_case import CodingTestCaseCreate
from app.schemas.coding_submission import CodingSubmissionCreate
from app.services.coding.problem_service import create_coding_problem
from app.services.coding.test_case_service import create_test_case
from app.services.coding.submission_service import create_submission
from app.dependencies.auth import get_current_user

router = APIRouter(
    prefix="/coding",
    tags=["Coding Interview"]
)


@router.post("/problems")
def create_problem(
    problem_data: CodingProblemCreate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return create_coding_problem(
        problem_data=problem_data,
        current_user_id=current_user.id,
        db=db
    )


@router.post("/test-cases")
def create_problem_test_case(
    test_case_data: CodingTestCaseCreate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return create_test_case(
        test_case_data=test_case_data,
        current_user_id=current_user.id,
        db=db
    )


@router.post("/submissions")
def submit_code(
    submission_data: CodingSubmissionCreate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return create_submission(
        submission_data=submission_data,
        current_user_id=current_user.id,
        db=db
    )

@router.post("/submissions/{submission_id}/evaluate")
def evaluate_submission_route(
    submission_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return evaluate_submission(
        submission_id=submission_id,
        current_user_id=current_user.id,
        db=db
    )
