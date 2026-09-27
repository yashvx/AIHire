from pydantic import BaseModel


class CodingSubmissionCreate(BaseModel):
    problem_id: int
    code: str
    language: str
