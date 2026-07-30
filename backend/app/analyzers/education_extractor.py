import re
from typing import List

from app.constants import EDUCATION_DATABASE


def extract_education(resume_text: str) -> List[str]:
    resume_lower = resume_text.lower()
    found_education = []

    for degree in EDUCATION_DATABASE:
        pattern = r"\b" + re.escape(degree.lower()) + r"\b"
        if re.search(pattern, resume_lower):
            found_education.append(degree)

    return found_education
