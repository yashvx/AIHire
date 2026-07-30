from app.analyzers.education_extractor import extract_education
from app.analyzers.email_extractor import extract_email
from app.analyzers.experience_extractor import extract_experience
from app.analyzers.name_extractor import extract_name
from app.analyzers.phone_extractor import extract_phone
from app.analyzers.projects_extractor import extract_projects
from app.analyzers.skills_extractor import extract_skills


def test_extractors() -> None:
    resume_text = """
    John Doe
    Email: john.doe@example.com
    Phone: +91 9876543210
    Skills: Python, FastAPI, SQL
    Education: B.Tech in Computer Science
    Projects: AIHire, Smart Assistant
    Experience: Software Engineer at ABC Tech
    """

    assert extract_name(resume_text) == "John Doe"
    assert extract_email(resume_text) == "john.doe@example.com"
    assert extract_phone(resume_text) == "+91 9876543210"
    assert extract_skills(resume_text) == ["Python", "FastAPI", "SQL"]
    assert extract_education(resume_text) == ["B.Tech"]
    assert extract_projects(resume_text) == ["AIHire", "Smart Assistant"]
    assert extract_experience(resume_text) == ["Software Engineer at ABC Tech"]
