from sqlalchemy.orm import Session

from app.models.interview import Interview
from app.models.interview_question import InterviewQuestion


def save_interview_questions(
    interview_id: int,
    current_user_id: int,
    questions: list[dict],
    db: Session
):
    interview = (
        db.query(Interview)
        .filter(
            Interview.id == interview_id,
            Interview.user_id == current_user_id
        )
        .first()
    )

    if not interview:
        return None

    existing_questions = (
        db.query(InterviewQuestion)
        .filter(
            InterviewQuestion.interview_id == interview_id
        )
        .order_by(InterviewQuestion.question_order)
        .all()
    )

    if existing_questions:
        return existing_questions

    saved_questions = []

    for index, question_data in enumerate(questions, start=1):
        question = InterviewQuestion(
            interview_id=interview_id,
            question_order=index,
            question=question_data["question"],
            category=question_data["category"],
            difficulty=question_data["difficulty"],
            source=question_data["source"]
        )

        db.add(question)
        saved_questions.append(question)

    db.commit()

    for question in saved_questions:
        db.refresh(question)

    return saved_questions