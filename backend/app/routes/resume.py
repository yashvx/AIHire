from fastapi import APIRouter, UploadFile, File, Depends

from app.dependencies.auth import get_current_user
from app.services.resume_service import upload_resume
from app.database.database import get_db
from sqlalchemy.orm import Session

router = APIRouter()


@router.post("/upload-resume")
def upload(
    file: UploadFile = File(...),
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)

):
    return upload_resume(file, current_user, db)