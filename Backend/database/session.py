from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from config import DATABASE_URL


engine = create_engine(
    DATABASE_URL,
    connect_args={"connect_timeout": 10},
    pool_pre_ping=True,
    pool_recycle=300,
)
SessionLocal = sessionmaker(bind = engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
