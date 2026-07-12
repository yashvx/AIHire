from app.utils.security import hash_password, verify_password
from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserRegister, UserLogin


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
        password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User Registered Successfully",
        "user_id": new_user.id
    }

def login_user(user: UserLogin, db: Session):

    existing_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if not existing_user:
        return {
            "message" : "Invalid email or password"
        }
    
    if not verify_password(user.password, existing_user.password):
        return {
            "message": "Invalid email or password"
        }
    
    return {
        "message": "Login Successful"
    }