from fastapi import APIRouter, UploadFile, File, Depends

from app.dependencies.auth import get_current_user
from app.services.resume_service import upload_resume
from app.services.resume_list_service import get_user_resumes
from app.services.resume_detail_service import get_resume_detail
from app.database.database import get_db
from sqlalchemy.orm import Session
from app.schemas.resume_list import ResumeListResponse
from app.schemas.resume_detail import ResumeDetailResponse

router = APIRouter()


@router.post("/upload-resume")
def upload(
    file: UploadFile = File(...),
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)

):
    return upload_resume(file, current_user, db)

@router.get("/resumes", response_model=list[ResumeListResponse])
def list_resumes(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return get_user_resumes(current_user.id, db)


@router.get("/resume/{resume_id}", response_model=ResumeDetailResponse)
def resume_detail(
    resume_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return get_resume_detail(resume_id, current_user.id, db)
