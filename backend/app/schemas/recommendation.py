from pydantic import BaseModel


class RecommendationItem(BaseModel):
    area: str
    priority: str
    recommendation: str
    reason: str
    practice_action: str


class RecommendationResponse(BaseModel):
    recommendations: list[RecommendationItem]
