import re
from typing import Optional

EMAIL_PATTERN = re.compile(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}")


def extract_email(resume_text: str) -> Optional[str]:
    match = EMAIL_PATTERN.search(resume_text)
    return match.group(0) if match else None
