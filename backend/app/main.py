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