from pydantic import BaseModel


class InterviewQuestion(BaseModel):
    id: int
    question: str
    category: str
    difficulty: str
    source: str
