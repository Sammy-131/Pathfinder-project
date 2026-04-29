from sqlalchemy import Column, Integer, String, ForeignKey
from database.session import Base

class Room(Base):
    __tablename__ = 'rooms'


    id = Column(Integer, primary_key=True)
    building_id = Column(Integer, ForeignKey('buildings.id'))
    room_name = Column(String)
    floor= Column(Integer, default=1)
    