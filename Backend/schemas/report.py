from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from enum import Enum

class ReportBase(BaseModel):
    title: str = Field(min_length=5, max_length=200)
    description: Optional[str] = None
    building_id: int


class ReportCreate(ReportBase):
    pass


class ReportResponse(ReportBase):
    id: int
    status: ReportStatus
    time: datetime

    class Config:
        from_attributes = True

class ReportUpdate(BaseModel):
    status: ReportStatus

class ReportStatus(str, Enum):
    pending = "pending"
    resolved = "resolved"
    rejected = "rejected"