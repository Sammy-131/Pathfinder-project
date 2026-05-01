from database.session import Base, engine
from models import building, room, report

def init_db():
    Base.metadata.create_all(bind=engine)