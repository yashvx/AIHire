from sqlalchemy import Column, Integer, String, Text, ForeignKey
from app.database.database import Base


class CodingProblem(Base):
    __tablename__ = "coding_problems"

    id = Column(Integer, primary_key=True, index=True)
    interview_id = Column(Integer, ForeignKey("interviews.id"), nullable=False)

    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    difficulty = Column(String(50), nullable=False)
    starter_code = Column(Text, nullable=True)
    expected_language = Column(String(50), nullable=False)

