from fastapi import FastAPI

app = FastAPI(
    title="AIHire API",
    description="Backend API for AIHire Interview Platform",
    version="1.0.0"
)


@app.get("/")
def root():
    return {
        "message": "Welcome to AIHire API!"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }

@app.get("/about")
def about():
    return {
        "project": "AIHire",
        "version": "1.0.0",
        "description": "AI-powered interview platform"
    }

@app.get("/developer")
def developer():
    return {
        "name": "Yash Dadhich",
        "role": "Backend Developer",
        "project": "AIHire"
    }

@app.get("/user/{name}")
def get_user(name: str):
    return {
        "message": f"Welcome {name}!"
    }

@app.get("/square/{number}")
def square(number: int):
    return {
        "number": number,
        "square": number * number
    }