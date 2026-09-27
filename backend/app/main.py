from fastapi import FastAPI

from app.database.database import engine
from app.database.database import Base, engine

from app.models.user import User
from app.models.resume import Resume
from app.models.interview import Interview
from app.models.interview_question import InterviewQuestion
from app.models.coding_problem import CodingProblem
from app.models.coding_test_case import CodingTestCase
from app.models.coding_submission import CodingSubmission

from app.routes.resume import router as resume_router
from app.routes.auth import router as auth_router
from app.routes.resume_analysis import router as resume_analysis_router
from app.routes.interview import router as interview_router
from app.routes.interview_questions import router as interview_questions_router
from app.routes.recommendations import router as recommendations_router
from app.routes.voice_answer import router as voice_answer_router
from app.models.interview_evaluation import InterviewEvaluation
from app.routes.coding import router as coding_router

app = FastAPI(
    title="AIHire API",
    version="1.0.0"
)
Base.metadata.create_all(bind=engine)
app.include_router(auth_router)

app.include_router(resume_router)
app.include_router(resume_analysis_router)
app.include_router(interview_router)
app.include_router(interview_questions_router)
app.include_router(recommendations_router)
app.include_router(voice_answer_router)
app.include_router(coding_router)