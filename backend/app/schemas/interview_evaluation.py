from datetime import datetime

from pydantic import BaseModel, Field


class InterviewEvaluationRequest(BaseModel):
    technical_score: int = Field(ge=0, le=100)
    communication_score: int = Field(ge=0, le=100)
    relevance_score: int = Field(ge=0, le=100)
    overall_score: int = Field(ge=0, le=100)
    feedback: str


class InterviewEvaluationResponse(BaseModel):
    id: int
    interview_id: int
    overall_score: int
    technical_score: int
    communication_score: int
    relevance_score: int
    summary: str | None = None
    strengths: str | None = None
    areas_to_improve: str | None = None
    recommendations: str | None = None
    created_at: datetime