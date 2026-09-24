from datetime import datetime
from pydantic import BaseModel


class ResumeListResponse(BaseModel):
    id: int
    original_filename: str
    file_type: str
    version: int
    is_active: bool
    created_at: datetime
