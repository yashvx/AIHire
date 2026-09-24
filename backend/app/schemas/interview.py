from pydantic import BaseModel


class InterviewCreate(BaseModel):
    resume_id: int
    company: str
    interview_type: str


class InterviewResponse(BaseModel):
    id: int
    user_id: int
    resume_id: int
    company: str
    interview_type: str
    status: str
    score: float | None = None
