from pydantic import BaseModel


class InterviewAnswerRequest(BaseModel):
    answer: str
