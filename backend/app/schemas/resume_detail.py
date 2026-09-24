from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class ResumeDetailResponse(BaseModel):
    id: int
    original_filename: str
    stored_filename: str
    file_path: str
    file_size: int
    file_type: str
    version: int
    is_active: bool
    created_at: datetime
    resume_text: Optional[str] = None
    parsed_data: Optional[dict] = None
