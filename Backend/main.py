from fastapi import FastAPI
from routers import reports, buildings, weather
from init_db import init_db
from fastapi.middleware.cors import CORSMiddleware #there was an error in the concole saying the
#CORS policy was blocking the backend from communicating with the front end

app = FastAPI(docs_url="/docs", redoc_url="/redoc")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
) #added this to allow the backend talk with the frontend

# Register routers
app.include_router(reports.router)
app.include_router(buildings.router)
app.include_router(weather.router)

# Create tables once at startup (safe place)
@app.on_event("startup")
async def startup_event():
    try:
        init_db()
        print("Database connected successfully")
    except Exception as e:
        print(f"Database connection failed: {e}")
        print("Server starting anyway...")
