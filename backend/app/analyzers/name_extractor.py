from typing import Optional


def extract_name(resume_text: str) -> Optional[str]:
    for line in resume_text.splitlines():
        clean_line = line.strip()
        if clean_line:
            return clean_line
    return None
