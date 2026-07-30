from app.parsers.resume_parser import extract_text_from_pdf

text = extract_text_from_pdf(
    "storage/resumes/user_4/948066a9-fd8c-4847-abc0-5ba13601ee9f.pdf"
)

print(text)