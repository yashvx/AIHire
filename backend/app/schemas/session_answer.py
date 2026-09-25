from pydantic import BaseModel


class SessionAnswerRequest(BaseModel):
    answer: str

