def generate_recommendations(evaluations):
    if not evaluations:
        return []

    technical_scores = [
        evaluation.technical_score
        for evaluation in evaluations
    ]

    communication_scores = [
        evaluation.communication_score
        for evaluation in evaluations
    ]

    relevance_scores = [
        evaluation.relevance_score
        for evaluation in evaluations
    ]

    average_scores = {
        "technical": round(
            sum(technical_scores) / len(technical_scores)
        ),
        "communication": round(
            sum(communication_scores) / len(communication_scores)
        ),
        "relevance": round(
            sum(relevance_scores) / len(relevance_scores)
        )
    }

    weakness_counts = {
        "technical": sum(score < 60 for score in technical_scores),
        "communication": sum(score < 60 for score in communication_scores),
        "relevance": sum(score < 60 for score in relevance_scores)
    }

    weakest_area = min(
        average_scores,
        key=average_scores.get
    )

    weakest_score = average_scores[weakest_area]
    weakness_count = weakness_counts[weakest_area]

    recommendations = []

    if weakest_area == "technical":
        recommendations.append({
            "area": "Technical Skills",
            "priority": "high",
            "recommendation": (
                "Practice technical questions and explain your implementation "
                "decisions using concrete examples from your projects."
            ),
            "reason": (
                f"Your average technical score is {weakest_score}, "
                f"and {weakness_count} of {len(evaluations)} completed "
                "interviews were below 60 in this area."
            ),
            "practice_action": (
                "Complete 5 technical interview questions and explain the "
                "reasoning and trade-offs behind each answer."
            )
        })

    elif weakest_area == "communication":
        recommendations.append({
            "area": "Communication",
            "priority": "high",
            "recommendation": (
                "Practice structuring your answers clearly using a beginning, "
                "technical explanation, and final result."
            ),
            "reason": (
                f"Your average communication score is {weakest_score}, "
                f"and {weakness_count} of {len(evaluations)} completed "
                "interviews were below 60 in this area."
            ),
            "practice_action": (
                "Complete 5 behavioral questions and structure each answer "
                "using Situation, Task, Action, and Result."
            )
        })

    elif weakest_area == "relevance":
        recommendations.append({
            "area": "Answer Relevance",
            "priority": "high",
            "recommendation": (
                "Practice answering the question directly before adding "
                "supporting details or examples."
            ),
            "reason": (
                f"Your average relevance score is {weakest_score}, "
                f"and {weakness_count} of {len(evaluations)} completed "
                "interviews were below 60 in this area."
            ),
            "practice_action": (
                "Complete 5 focused interview questions and make sure each "
                "answer directly addresses the question before adding examples."
            )
        })

    return recommendations
