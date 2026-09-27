from pydantic import BaseModel


class CodingProblemCreate(BaseModel):
    interview_id: int
    title: str
    description: str
    difficulty: str
    starter_code: str | None = None
    expected_language: str
