from sqlalchemy import Column, Integer, String, ForeignKey

from app.database.database import Base


class InterviewQuestion(Base):
    __tablename__ = "interview_questions"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    interview_id = Column(
        Integer,
        ForeignKey("interviews.id"),
        nullable=False
    )

    question = Column(
        String,
        nullable=False
    )

    category = Column(
        String(50),
        nullable=False
    )

    difficulty = Column(
        String(50),
        nullable=False
    )

    source = Column(
        String(50),
        nullable=False
    )
