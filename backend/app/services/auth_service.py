from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserRegister


def register_user(user: UserRegister, db: Session):

    # Check if email already exists
    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:
        return {
            "message": "Email already registered"
        }

    new_user = User(
        full_name=user.full_name,
        email=user.email,
        password=user.password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User Registered Successfully",
        "user_id": new_user.id
    }