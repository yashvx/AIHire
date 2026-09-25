from pydantic import BaseModel


class SessionAnswerResponse(BaseModel):
    question_id: int
    question_order: int
    answer: str
    technical_score: int
    communication_score: int
    relevance_score: int
    overall_score: int
    feedback: str
    next_question_order: int | None = None
    interview_status: str
