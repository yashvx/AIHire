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


def extract_experience(resume_text: str) -> List[str]:
    lines = resume_text.splitlines()
    experience_section = False
    experience = []

    for line in lines:
        clean_line = line.strip()
        if not clean_line:
            continue

        lower_line = clean_line.lower()
        if lower_line == "experience":
            experience_section = True
            continue

        if experience_section:
            if lower_line in SECTION_HEADERS:
                break
            experience.append(clean_line)

    return experience
