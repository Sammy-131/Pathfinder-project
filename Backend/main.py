import os
from dotenv import load_dotenv
load_dotenv()
print(os.getenv("DATABASE_URL"))



from database.session import Base, engine
from models import building, room, report

Base.metadata.create_all(bind=engine)
