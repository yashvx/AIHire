from typing import List

SECTION_HEADERS = {
    "education",
    "skills",
    "projects",
    "experience",
    "certifications",
    "achievements",
    "internships",
    "languages",
    "interests",
}


def extract_projects(resume_text: str) -> List[str]:
    lines = resume_text.splitlines()
    project_section = False
    projects = []

    for line in lines:
        clean_line = line.strip()
        if not clean_line:
            continue

        lower_line = clean_line.lower()
        if lower_line == "projects":
            project_section = True
            continue

        if project_section:
            if lower_line in SECTION_HEADERS:
                break
            projects.append(clean_line)

    return projects
