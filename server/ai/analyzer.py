import pdfplumber
import sys
from skills import extract_skills

def extract_text(pdf_path):
    text = ""

    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() or ""

    return text

if __name__ == "__main__":
    pdf_path = sys.argv[1]
    jd = sys.argv[2]

    resume_text = extract_text(pdf_path)

    resume_skills = extract_skills(resume_text)
    jd_skills = extract_skills(jd)

    matched = list(set(resume_skills) & set(jd_skills))
    missing = list(set(jd_skills) - set(resume_skills))

    score = 0

    if len(jd_skills) > 0:
        score = round((len(matched) / len(jd_skills)) * 100)

    result = {
        "resumeText": resume_text,
        "atsScore": score,
        "matchedSkills": matched,
        "missingSkills": missing
    }

    import json
    print(json.dumps(result))