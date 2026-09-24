from pydantic import BaseModel


class InterviewQuestionRequest(BaseModel):
    resume_id: int
    company: str
    interview_type: str


class InterviewQuestionResponse(BaseModel):
    questions: list[str]
