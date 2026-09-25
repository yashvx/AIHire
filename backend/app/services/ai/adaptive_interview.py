def analyze_answer_for_adaptation(
    technical_score: int,
    communication_score: int,
    relevance_score: int,
    overall_score: int
):
    focus_areas = []
    next_difficulty = "medium"

    if technical_score < 60:
        focus_areas.append("technical fundamentals")

    if communication_score < 60:
        focus_areas.append("communication clarity")

    if relevance_score < 60:
        focus_areas.append("answer relevance")

    if overall_score >= 80:
        next_difficulty = "hard"
    elif overall_score < 60:
        next_difficulty = "easy"

    if not focus_areas:
        focus_areas.append("deeper technical reasoning")

    return {
        "focus_areas": focus_areas,
        "next_difficulty": next_difficulty
    }
