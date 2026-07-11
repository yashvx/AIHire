from pydantic import BaseModel, Field, EmailStr, model_validator


class UserRegister(BaseModel):
    full_name: str = Field(min_length=3, max_length=50)

    email: EmailStr

    password: str = Field(min_length=8, max_length=32)

    confirm_password: str

    @model_validator(mode="after")
    def passwords_match(self):
        if self.password != self.confirm_password:
            raise ValueError("Passwords do not match")
        return self