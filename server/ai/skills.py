skills = [
    "python",
    "java",
    "c++",
    "javascript",
    "react",
    "node",
    "express",
    "mongodb",
    "sql",
    "aws",
    "docker",
    "git",
    "tensorflow",
    "machine learning",
    "nlp",
    "html",
    "css"
]

def extract_skills(text):
    text = text.lower()

    found = []

    for skill in skills:
        if skill in text:
            found.append(skill)

    return list(set(found))