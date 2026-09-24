def build_resume_context(resume_text: str):
    if not resume_text:
        return {
            "context": "",
            "has_resume_data": False
        }

    lines = [
        line.strip()
        for line in resume_text.splitlines()
        if line.strip()
    ]

    excluded_keywords = [
        "email",
        "phone",
        "linkedin",
        "github",
        "dob:",
        "date of birth",
        "gender:"
    ]

    filtered_lines = []

    for line in lines:
        lower_line = line.lower()

        if any(
            keyword in lower_line
            for keyword in excluded_keywords
        ):
            continue

        filtered_lines.append(line)

    context = "\n".join(filtered_lines[:80])

    return {
        "context": context,
        "has_resume_data": True
    }

