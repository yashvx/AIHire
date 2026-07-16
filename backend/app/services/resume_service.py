import os
import uuid

from fastapi import UploadFile, HTTPException
from sqlalchemy.orm import Session
from app.models.user import User
from app.models.resume import Resume

UPLOAD_DIR = "storage/resumes"


def upload_resume(
    file: UploadFile,
    current_user: User,
    db: Session
):

    allowed_extensions = [".pdf", ".docx"]

    extension = os.path.splitext(file.filename)[1].lower()

    if extension not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail="Only PDF and DOCX files are allowed."
        )

    unique_filename = f"{uuid.uuid4()}{extension}"

    user_folder = os.path.join(
        UPLOAD_DIR,
        f"user_{current_user.id}"
    )

    os.makedirs(user_folder, exist_ok=True)

    file_path = os.path.join(
        user_folder,
        unique_filename
    )

    # Save file
    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())

    # Save metadata
    resume = Resume(
        user_id=current_user.id,
        original_filename=file.filename,
        stored_filename=unique_filename,
        file_path=file_path,
        file_size=os.path.getsize(file_path),
        file_type=extension,
        version=1,
        is_active=True
    )

    db.add(resume)
    db.commit()
    db.refresh(resume)

    return {
        "message": "Resume uploaded successfully",
        "resume_id": resume.id,
        "filename": resume.original_filename,
        "stored_filename": resume.stored_filename
    }