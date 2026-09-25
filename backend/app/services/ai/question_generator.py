from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.resume import Resume
from app.schemas.interview_questions import InterviewQuestionRequest
from app.services.ai.resume_context import build_resume_context
from app.services.interview_question_service import save_interview_questions


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
        questions = [
            {
                "question": f"Tell me about your experience relevant to {company}.",
                "category": "general",
                "difficulty": "easy",
                "source": "general"
            },
            {
                "question": "Explain one important project from your background.",
                "category": "project",
                "difficulty": "easy",
                "source": "general"
            },
            {
                "question": (
                    f"What technical skills are relevant to a "
                    f"{interview_type} interview?"
                ),
                "category": "technical",
                "difficulty": "medium",
                "source": "general"
            }
        ]

        for index, question in enumerate(questions, start=1):
            question["id"] = index

        return questions

    technologies = extract_technologies(resume_text)
    projects = extract_projects(resume_text)

    questions = [
        {
            "question": (
                f"Based on your resume, tell me about your experience "
                f"relevant to {company}."
            ),
            "category": "general",
            "difficulty": "easy",
            "source": "resume"
        }
    ]

    if technologies:
        technology = technologies[0]

        questions.append(
            {
                "question": (
                    f"You mention {technology} on your resume. "
                    f"Explain how you have used {technology} in a project."
                ),
                "category": "technical",
                "difficulty": "medium",
                "source": "resume"
            }
        )

    if len(technologies) >= 2:
        questions.append(
            {
                "question": (
                    f"Your resume mentions {technologies[0]} and "
                    f"{technologies[1]}. Explain how these technologies "
                    f"work together in one of your projects."
                ),
                "category": "technical",
                "difficulty": "medium",
                "source": "resume"
            }
        )

    if projects:
        project = projects[0]

        questions.append(
            {
                "question": (
                    f"Tell me about the project or experience described as: "
                    f"{project}"
                ),
                "category": "project",
                "difficulty": "medium",
                "source": "resume"
            }
        )

    if interview_type.lower() == "hr":
        article = "an"
        display_interview_type = "HR"
    else:
        article = "a"
        display_interview_type = interview_type

    questions.append(
        {
            "question": (
                f"What technical challenge from your experience would you "
                f"expect to discuss in {article} "
                f"{display_interview_type} interview?"
            ),
            "category": interview_type.lower(),
            "difficulty": "hard",
            "source": "resume"
        }
    )

    questions = questions[:5]

    for index, question in enumerate(questions, start=1):
        question["id"] = index

    return questions


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

    saved_questions = save_interview_questions(
        interview_id=request.interview_id,
        current_user_id=current_user_id,
        questions=questions,
        db=db
    )

    if saved_questions is None:
        raise HTTPException(
            status_code=404,
            detail="Interview not found"
        )

    return {
        "company": request.company,
        "interview_type": request.interview_type,
        "total_questions": len(saved_questions),
        "questions": [
            {
                "id": question.id,
                "question": question.question,
                "category": question.category,
                "difficulty": question.difficulty,
                "source": question.source
            }
            for question in saved_questions
        ]
    }
