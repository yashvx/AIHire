from pydantic import BaseModel


class AdaptiveQuestionResponse(BaseModel):
    id: int
    question_order: int
    question: str
    category: str
    difficulty: str
    source: str
    is_adaptive: bool


class AdaptationResponse(BaseModel):
    focus_areas: list[str]
    next_difficulty: str


class SessionAnswerResponse(BaseModel):
    question_id: int
    question_order: int
    answer: str
    technical_score: int
    communication_score: int
    relevance_score: int
    overall_score: int
    feedback: str
    adaptation: AdaptationResponse
    next_question: AdaptiveQuestionResponse | None = None
    next_question_order: int | None = None
    interview_status: str
