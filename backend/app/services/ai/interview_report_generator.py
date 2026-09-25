from app.models.interview_question import InterviewQuestion


def generate_interview_report_content(
    questions: list[InterviewQuestion],
    company: str,
    role: str,
    overall_score: int,
    technical_score: int,
    communication_score: int,
    relevance_score: int
):
    strengths = []
    areas_to_improve = []
    recommendations = []

    if technical_score >= 70:
        strengths.append(
            "Demonstrates solid technical understanding across the interview."
        )
    else:
        areas_to_improve.append(
            "Technical explanations need more depth and concrete implementation details."
        )
        recommendations.append(
            "Explain technical decisions using specific examples from your projects."
        )

    if communication_score >= 70:
        strengths.append(
            "Communicates answers clearly and consistently."
        )
    else:
        areas_to_improve.append(
            "Answers could be more structured and detailed."
        )
        recommendations.append(
            "Use a clear structure when answering: situation, approach, action, and result."
        )

    if relevance_score >= 70:
        strengths.append(
            "Answers are strongly aligned with the questions asked."
        )
    else:
        areas_to_improve.append(
            "Answers should connect more directly to the specific question."
        )
        recommendations.append(
            "Focus on directly answering the question before adding supporting details."
        )

    if overall_score >= 80:
        summary = (
            "The interview demonstrates strong overall performance with "
            "consistent technical, communication, and relevance scores."
        )
    elif overall_score >= 60:
        summary = (
            "The interview demonstrates a developing skill set with several "
            "strong areas and opportunities for improvement."
        )
    else:
        summary = (
            "The interview shows a foundation of relevant skills, but several "
            "areas require improvement before interview performance becomes consistent."
        )

    if not strengths:
        strengths.append(
            "The candidate completed the interview and provided responses "
            "across the evaluated questions."
        )

    if not areas_to_improve:
        areas_to_improve.append(
            "Continue practicing interview questions to maintain consistency."
        )

    if not recommendations:
        recommendations.append(
            "Continue practicing with increasingly difficult interview questions."
        )

    return {
        "summary": summary,
        "strengths": " ".join(strengths),
        "areas_to_improve": " ".join(areas_to_improve),
        "recommendations": " ".join(recommendations)
    }

