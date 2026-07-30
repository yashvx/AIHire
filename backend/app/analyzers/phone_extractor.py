import re
from typing import Optional

PHONE_PATTERN = re.compile(r"(?:\+91[\s-]?)?[6-9]\d{9}")


def extract_phone(resume_text: str) -> Optional[str]:
    match = PHONE_PATTERN.search(resume_text)
    return match.group(0) if match else None
