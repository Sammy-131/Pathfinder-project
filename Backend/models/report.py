from sqlalchemy import Column, DateTime, Integer, String, func, ForeignKey
from sqlalchemy.ext.hybrid import hybrid_property
from database.session import Base
from datetime import timezone
import pytz

WINDSOR_TZ = pytz.timezone("America/Toronto")
class Report(Base):
    __tablename__ = 'reports'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    building_id = Column(Integer, ForeignKey('buildings.id'))
    _time = Column("time", DateTime(timezone=True), server_default=func.now())
    status = Column(String, default="pending")

@hybrid_property
def time(self):
        """Always returns time in Windsor/Eastern timezone."""
        if self._time is None:
            return None
        # If the datetime is naive (no tzinfo), assume it's UTC
        if self._time.tzinfo is None:
            utc_time = self._time.replace(tzinfo=timezone.utc)
        else:
            utc_time = self._time
        return utc_time.astimezone(WINDSOR_TZ)

@time.setter
def time(self, value):
    """Store time as UTC internally."""
    if value is None:
        self._time = None
    elif value.tzinfo is None:
        # Assume naive datetimes are already UTC
        self._time = value
    else:
            self._time = value.astimezone(timezone.utc).replace(tzinfo=None)