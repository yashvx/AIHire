from pydantic import BaseModel


class CodingTestCaseCreate(BaseModel):
    problem_id: int
    input_data: str
    expected_output: str
    is_hidden: bool = True
