from fastapi import FastAPI
from routers import reports, buildings, weather
from init_db import init_db

app = FastAPI()

# Register routers
app.include_router(reports.router)
app.include_router(buildings.router)
app.include_router(weather.router)

# Create tables once at startup (safe place)
init_db()
