from fastapi import FastAPI
from routers import report, building, room
from database.init_db import init_db

app = FastAPI()

# Register routers
app.include_router(report.router)
app.include_router(building.router)


# Create tables once at startup (safe place)
init_db()
