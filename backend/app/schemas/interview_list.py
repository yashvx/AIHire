from datetime import datetime

from pydantic import BaseModel


class InterviewListResponse(BaseModel):
    id: int
    resume_id: int
    company: str
    interview_type: str
    status: str
    score: float | None = None
    created_at: datetime
