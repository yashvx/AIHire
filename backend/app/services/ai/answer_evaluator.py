def evaluate_answer(
    question: str,
    answer: str
):
    if not answer.strip():
        return {
            "technical_score": 0,
            "communication_score": 0,
            "relevance_score": 0,
            "overall_score": 0,
            "feedback": "No answer was provided."
        }

    answer_length = len(answer.split())

    if answer_length < 10:
        communication_score = 40
    elif answer_length < 30:
        communication_score = 65
    else:
        communication_score = 80

    question_keywords = set(
        question.lower().split()
    )

    answer_keywords = set(
        answer.lower().split()
    )

    matching_keywords = (
        question_keywords & answer_keywords
    )

    relevance_score = min(
        100,
        len(matching_keywords) * 10
    )

    technical_score = min(
        100,
        50 + answer_length
    )

    overall_score = round(
        (
            technical_score
            + communication_score
            + relevance_score
        ) / 3
    )

    return {
        "technical_score": technical_score,
        "communication_score": communication_score,
        "relevance_score": relevance_score,
        "overall_score": overall_score,
        "feedback": (
            "Answer evaluated based on "
            "technical detail, communication, "
            "and relevance."
        )
    }
