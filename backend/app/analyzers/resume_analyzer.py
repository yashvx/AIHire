from app.analyzers.email_extractor import extract_email
from app.analyzers.phone_extractor import extract_phone
from app.analyzers.name_extractor import extract_name
from app.analyzers.skills_extractor import extract_skills
from app.analyzers.education_extractor import extract_education
from app.analyzers.projects_extractor import extract_projects
from app.analyzers.experience_extractor import extract_experience


def analyze_resume(resume_text: str):

    return {
        "name": extract_name(resume_text),
        "email": extract_email(resume_text),
        "phone": extract_phone(resume_text),
        "skills": extract_skills(resume_text),
        "education": extract_education(resume_text),
        "projects": extract_projects(resume_text),
        "experience": extract_experience(resume_text),
    }