from pydantic import BaseModel
from typing import Optional


class ResumeAnalysisResponse(BaseModel):
    resume_id: int
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    skills: list[str] = []
    education: list[str] = []
    projects: list[str] = []
    experience: list[str] = []
