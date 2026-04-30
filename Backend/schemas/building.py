from pydantic import BaseModel
from typing import List, Optional

class BuildingBase(BaseModel):
    name: str
    description: Optional[str] = ""
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    open_time: Optional[str] = "08:00"
    close_time: Optional[str] = "22:00"
    facilities: Optional[List[str]] = []

class BuildingCreate(BuildingBase):
    pass

class BuildingOut(BuildingBase):
    name: str
    description: str
    open_time: str
    close_time: str
    facilities: List[str]

    class Config:
        from_attributes = True


class BuildingUpdate(BaseModel):
    open_time: Optional[str] = None
    close_time: Optional[str] = None
    facilities: Optional[List[str]] = None
        


