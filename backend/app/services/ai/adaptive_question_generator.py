def generate_adaptive_question(
    company: str,
    role: str,
    interview_type: str,
    previous_question: str,
    focus_areas: list[str],
    difficulty: str
):
    focus = focus_areas[0] if focus_areas else "deeper technical reasoning"

    if focus == "technical fundamentals":
        question = (
            f"Explain the core technical concepts you would need to know "
            f"to perform effectively as a {role} at {company}."
        )

    elif focus == "communication clarity":
        question = (
            f"Explain a technical decision you made in a project and "
            f"describe it clearly as you would in a {interview_type} "
            f"interview for a {role} role at {company}."
        )

    elif focus == "answer relevance":
        question = (
            f"Give a specific example from your experience that directly "
            f"demonstrates your ability to solve problems as a {role} at "
            f"{company}."
        )

    else:
        question = (
            f"Go deeper into the technical reasoning behind your previous "
            f"answer and explain how you would apply that approach as a "
            f"{role} at {company}."
        )

    return {
        "question": question,
        "category": "adaptive",
        "difficulty": difficulty,
        "source": "adaptive"
    }
