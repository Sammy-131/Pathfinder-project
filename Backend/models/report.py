from sqlalchemy import Column, DateTime, Integer, String, func, ForeignKey
from database.session import Base

class Report(Base):
    __tablename__ = 'reports'

    id = Column(Integer, primary_key=True)
    title = Column(String)
    description = Column(String)
    building_id = Column(Integer, ForeignKey('buildings.id'))
    time = Column(DateTime,server_default=func.now())
    status = Column(String, default="pending")
