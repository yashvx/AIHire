from pydantic import BaseModel


class CurrentQuestionResponse(BaseModel):
    id: int
    interview_id: int
    question_order: int
    question: str
    category: str
    difficulty: str
    source: str

