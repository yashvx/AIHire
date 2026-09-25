from datetime import datetime

from pydantic import BaseModel


class InterviewReportQuestion(BaseModel):
    id: int
    question: str
    category: str
    difficulty: str
    answer: str | None = None

    technical_score: int | None = None
    communication_score: int | None = None
    relevance_score: int | None = None
    overall_score: int | None = None

    feedback: str | None = None


class InterviewReportResponse(BaseModel):
    interview_id: int
    company: str
    interview_type: str
    status: str

    overall_score: int | None = None
    technical_score: int | None = None
    communication_score: int | None = None
    relevance_score: int | None = None

    summary: str | None = None
    strengths: str | None = None
    areas_to_improve: str | None = None

    created_at: datetime

    questions: list[InterviewReportQuestion]

