from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.resume_analysis import ResumeAnalysisResponse
from app.services.resume_analysis_service import get_resume_analysis
from app.dependencies.auth import get_current_user


router = APIRouter(
    prefix="/resume",
    tags=["Resume Analysis"]
)


@router.get(
    "/{resume_id}/analysis",
    response_model=ResumeAnalysisResponse
)
def resume_analysis(
    resume_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return get_resume_analysis(
        resume_id=resume_id,
        current_user_id=current_user.id,
        db=db
    )
