from sqlalchemy import Column, Integer, String
from database.session import Base

class Report(Base):
    __tablename__ = 'reports'

    id = Column(Integer, primary_key=True)
    title = Column(String)
    description = Column(String)

