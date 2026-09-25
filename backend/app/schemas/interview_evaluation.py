from pydantic import BaseModel, Field


class InterviewEvaluationRequest(BaseModel):
    technical_score: int = Field(ge=0, le=100)
    communication_score: int = Field(ge=0, le=100)
    relevance_score: int = Field(ge=0, le=100)
    overall_score: int = Field(ge=0, le=100)
    feedback: str
