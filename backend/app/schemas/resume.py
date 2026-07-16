from pydantic import BaseModel

class ResumeResponse(BaseModel):
    id:int
    original_filename: str
    file_type: str
    file_size: int
    version: int

class config:
    from_attributes = True