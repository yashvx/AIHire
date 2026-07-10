from app.schemas.user import UserRegister
def register_user(user: UserRegister):

    return {
        "message": "Registration Successful",
        "user": {
            "full_name": user.full_name,
            "email": user.email,
            "age": user.age
        }
    }