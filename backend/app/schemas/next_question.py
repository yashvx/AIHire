from pydantic import BaseModel


class NextQuestionResponse(BaseModel):
    id: int
    interview_id: int
    question_order: int
    question: str
    category: str
    difficulty: str
    source: str
