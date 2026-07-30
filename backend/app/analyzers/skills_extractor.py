import re
from typing import List

from app.constants import SKILLS_DATABASE


def extract_skills(resume_text: str) -> List[str]:
    resume_lower = resume_text.lower()
    found_skills = []

    for skill in SKILLS_DATABASE:
        pattern = r"\b" + re.escape(skill.lower()) + r"\b"
        if re.search(pattern, resume_lower):
            found_skills.append(skill)

    return found_skills
