from sqlalchemy import Column, Integer, String
from session import Base

class Report(Base):
    __tablename__ = 'reports'

    id = Column(Integer, primary_key=True)
    title = Column(String)
    description = Column(String)

    def __init__(self, title, description):
        self.title = title
        self.description = description