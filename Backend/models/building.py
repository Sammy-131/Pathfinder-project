from sqlalchemy import Column, Integer, String, Float, Boolean, ARRAY
from database.session import Base

class Building(Base):
	__tablename__ = "buildings"
	
	id		= Column(Integer, primary_key=True)
	name		= Column(String, nullable=False)
	description	= Column(String, default="")
	latitude	= Column(Float)
	longitude	= Column(Float)
	open_time	= Column(String, default="08:00")
	close_time	= Column(String, default="22:00")
	facilities	= Column(ARRAY(String), default=[])
	is_open		= Column(Boolean, default=True)
