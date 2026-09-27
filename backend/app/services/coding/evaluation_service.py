import ast

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.coding_submission import CodingSubmission
from app.models.coding_problem import CodingProblem
from app.models.coding_test_case import CodingTestCase
from app.services.coding.code_executor import execute_code


def evaluate_submission(
    submission_id: int,
    current_user_id: int,
    db: Session
):
    submission = (
        db.query(CodingSubmission)
        .filter(
            CodingSubmission.id == submission_id,
            CodingSubmission.user_id == current_user_id
        )
        .first()
    )

    if not submission:
        raise HTTPException(
            status_code=404,
            detail="Submission not found"
        )

    problem = (
        db.query(CodingProblem)
        .filter(
            CodingProblem.id == submission.problem_id
        )
        .first()
    )

    if not problem:
        raise HTTPException(
            status_code=404,
            detail="Coding problem not found"
        )

    test_cases = (
        db.query(CodingTestCase)
        .filter(
            CodingTestCase.problem_id == problem.id
        )
        .all()
    )

    if not test_cases:
        raise HTTPException(
            status_code=400,
            detail="No test cases found"
        )

    results = []
    passed_count = 0
    total_execution_time = 0

    for test_case in test_cases:
        execution = execute_code(
            code=submission.code,
            language=submission.language,
            input_data=test_case.input_data
        )

        total_execution_time += execution.get("execution_time", 0)

        actual_output = execution["output"].strip()
        expected_output = test_case.expected_output.strip()

        try:
            actual_value = ast.literal_eval(actual_output)
            expected_value = ast.literal_eval(expected_output)

            outputs_match = actual_value == expected_value

        except (ValueError, SyntaxError):
            normalized_actual = " ".join(actual_output.split())
            normalized_expected = " ".join(expected_output.split())

            outputs_match = normalized_actual == normalized_expected

        if execution["status"] == "completed":

            if outputs_match:
                test_status = "passed"
                passed_count += 1
            else:
                test_status = "failed"

        else:
            test_status = execution["status"]

        results.append({
            "test_case_id": test_case.id,
            "status": test_status,
            "output": actual_output,
            "error": execution["error"]
        })

    total_tests = len(test_cases)

    score = round(
        (passed_count / total_tests) * 100
    )

    all_passed = passed_count == total_tests

    submission.status = "evaluated"
    submission.passed = all_passed
    submission.score = score
    submission.execution_time = total_execution_time

    if all_passed:
        submission.feedback = "All test cases passed."
    else:
        submission.feedback = (
            f"{passed_count} of {total_tests} test cases passed."
        )

    db.commit()
    db.refresh(submission)

    return {
        "submission_id": submission.id,
        "problem_id": submission.problem_id,
        "passed": submission.passed,
        "score": submission.score,
        "feedback": submission.feedback,
        "test_results": results
    }