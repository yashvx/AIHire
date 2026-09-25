from pydantic import BaseModel


class SessionAnswerResponse(BaseModel):
    question_id: int
    question_order: int
    answer: str
    next_question_order: int | None = None

