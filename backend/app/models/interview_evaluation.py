from sqlalchemy import Column, Integer, Text, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy import DateTime

from app.database.database import Base


class InterviewEvaluation(Base):
    __tablename__ = "interview_evaluations"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    interview_id = Column(
        Integer,
        ForeignKey("interviews.id"),
        unique=True,
        nullable=False
    )

    overall_score = Column(
        Integer,
        nullable=False
    )

    technical_score = Column(
        Integer,
        nullable=False
    )

    communication_score = Column(
        Integer,
        nullable=False
    )

    relevance_score = Column(
        Integer,
        nullable=False
    )

    summary = Column(
        Text,
        nullable=True
    )

    strengths = Column(
        Text,
        nullable=True
    )

    areas_to_improve = Column(
        Text,
        nullable=True
    )

    recommendations = Column(
        Text, 
        nullable=True
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )
