from sqlalchemy import Column, Integer, Text, String, ForeignKey, Boolean
from app.database.database import Base


class CodingSubmission(Base):
    __tablename__ = "coding_submissions"

    id = Column(Integer, primary_key=True, index=True)
    problem_id = Column(Integer, ForeignKey("coding_problems.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    code = Column(Text, nullable=False)
    language = Column(String(50), nullable=False)

    status = Column(String(50), nullable=True)
    passed = Column(Boolean, nullable=True)
    score = Column(Integer, nullable=True)
    execution_time = Column(Integer, nullable=True)
    feedback = Column(Text, nullable=True)
