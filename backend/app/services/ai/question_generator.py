from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.resume import Resume
from app.schemas.interview_questions import InterviewQuestionRequest
from app.services.ai.resume_context import build_resume_context


TECHNOLOGIES = [
    "Python",
    "FastAPI",
    "React",
    "React.js",
    "PostgreSQL",
    "SQL",
    "MongoDB",
    "SQLAlchemy",
    "Pydantic",
    "JavaScript",
    "JWT",
    "Machine Learning",
    "Git",
    "GitHub"
]


def extract_technologies(resume_text: str):
    found_technologies = []

    for technology in TECHNOLOGIES:
        if technology.lower() in resume_text.lower():
            found_technologies.append(technology)

    return found_technologies


def extract_projects(resume_text: str):
    projects = []

    lines = resume_text.splitlines()

    for line in lines:
        line = line.strip()

        if " – " in line or " - " in line:
            projects.append(line)

    return projects[:5]


def generate_questions(
    resume_text: str,
    company: str,
    interview_type: str
):
    resume_context = build_resume_context(resume_text)

    if not resume_context["has_resume_data"]:
        return [
            f"Tell me about your experience relevant to {company}.",
            "Explain one important project from your background.",
            f"What technical skills are relevant to a {interview_type} interview?"
        ]

    technologies = extract_technologies(resume_text)
    projects = extract_projects(resume_text)

    questions = [
        f"Based on your resume, tell me about your experience relevant to {company}."
    ]

    if technologies:
        technology = technologies[0]

        questions.append(
            f"You mention {technology} on your resume. "
            f"Explain how you have used {technology} in a project."
        )

    if len(technologies) >= 2:
        questions.append(
            f"Your resume mentions {technologies[0]} and "
            f"{technologies[1]}. Explain how these technologies "
            f"work together in one of your projects."
        )

    if projects:
        project = projects[0]

        questions.append(
            f"Tell me about the project or experience described as: "
            f"{project}"
        )

    if interview_type.lower() == "hr":
        article = "an"
        display_interview_type = "HR"
    else:
        article = "a"
        display_interview_type = interview_type

    questions.append(
        f"What technical challenge from your experience would you "
        f"expect to discuss in {article} {display_interview_type} interview?"
    )

    return questions[:5]


def generate_interview_questions(
    request: InterviewQuestionRequest,
    current_user_id: int,
    db: Session
):
    resume = (
        db.query(Resume)
        .filter(
            Resume.id == request.resume_id,
            Resume.user_id == current_user_id
        )
        .first()
    )

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    questions = generate_questions(
        resume_text=resume.resume_text or "",
        company=request.company,
        interview_type=request.interview_type
    )

    return {
        "questions": questions
    }
