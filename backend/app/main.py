from fastapi import FastAPI

from app.database.database import engine
from app.database.database import Base, engine

from app.models.user import User
from app.models.resume import Resume

from app.routes.resume import router as resume_router
from app.routes.auth import router as auth_router


app = FastAPI(
    title="AIHire API",
    version="1.0.0"
)
Base.metadata.create_all(bind=engine)
app.include_router(auth_router)

app.include_router(resume_router)