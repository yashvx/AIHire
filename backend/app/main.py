from fastapi import FastAPI
from pydantic import BaseModel, Field, EmailStr, model_validator




app = FastAPI(
    title="AIHire API",
    description="Backend API for AIHire Interview Platform",
    version="1.0.0"
)

class UserRegister(BaseModel):
    full_name: str = Field(min_length=3, max_length=50)
    email: EmailStr
    age: int = Field(gt=17, lt=60)
    password: str = Field(min_length=8, max_length=32)
    confirm_password: str

    @model_validator(mode="after")
    def passwords_match(self):
        if self.password != self.confirm_password:
            raise ValueError("Passwords do not match")
        return self


@app.post("/register")
def register(user: UserRegister):
    return {
        "message": "Registration Successful!",
        "user": {
            "full_name": user.full_name,
            "email": user.email,
            "age": user.age
        }
    }



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