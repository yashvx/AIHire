from app.analyzers.resume_analyzer import analyze_resume

sample_resume = """
John Doe

Experience

Software Engineer
ABC Technologies

Backend Intern
XYZ Solutions

Projects

AIHire
"""

print(analyze_resume(sample_resume))