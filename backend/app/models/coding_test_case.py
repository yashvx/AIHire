from sqlalchemy import Column, Integer, Text, ForeignKey, Boolean
from app.database.database import Base


class CodingTestCase(Base):
    __tablename__ = "coding_test_cases"

    id = Column(Integer, primary_key=True, index=True)
    problem_id = Column(Integer, ForeignKey("coding_problems.id"), nullable=False)

    input_data = Column(Text, nullable=False)
    expected_output = Column(Text, nullable=False)
    is_hidden = Column(Boolean, nullable=False, default=True)

