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
    id: int
    name: str
    description: str
    open_time: str
    close_time: str
    facilities: List[str]
    is_open : bool #added is_open and id to match building data in database so the building panel renders on the map
    class Config:
        from_attributes = True


class BuildingUpdate(BaseModel):
    open_time: Optional[str] = None
    close_time: Optional[str] = None
    facilities: Optional[List[str]] = None
    