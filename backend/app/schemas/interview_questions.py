from pydantic import BaseModel

from app.schemas.interview_question import InterviewQuestion


class InterviewQuestionRequest(BaseModel):
    interview_id: int
    resume_id: int
    company: str
    interview_type: str

class InterviewQuestionResponse(BaseModel):
    company: str
    interview_type: str
    total_questions: int
    questions: list[InterviewQuestion]
