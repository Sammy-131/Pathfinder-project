from fastapi import APIRouter, HTTPException
import httpx
import os
import time
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/weather", tags=["weather"])

WEATHER_CODES = {
    0: "Clear", 1: "Clear", 2: "Partly Cloudy", 3: "Cloudy",
    45: "Fog", 48: "Fog",
    51: "Drizzle", 53: "Drizzle", 55: "Drizzle",
    61: "Rain", 63: "Rain", 65: "Rain",
    71: "Snow", 73: "Snow", 75: "Snow",
    80: "Rain", 81: "Rain", 82: "Rain",
    95: "Thunderstorm", 96: "Thunderstorm", 99: "Thunderstorm"
} #using open-meteo api now which uses numbers instead of text based weather

# weather barely changes minute to minute, so reuse the last result for 10 minutes
# instead of calling open-meteo every time the frontend polls
CACHE_SECONDS = 600
_cache = {"data": None, "fetched_at": 0.0}

@router.get("/")
async def get_weather():
    if _cache["data"] and time.time() - _cache["fetched_at"] < CACHE_SECONDS:
        return _cache["data"]

    try:
        async with httpx.AsyncClient(timeout=5) as client:
            response = await client.get(
                "https://api.open-meteo.com/v1/forecast",
                params={
                    "latitude": 42.3034,
                    "longitude": -83.0660,
                    "current_weather": True,
                    "temperature_unit": "celsius"
                }
            )
        response.raise_for_status()
        current = response.json()["current_weather"]
    except (httpx.HTTPError, KeyError):
        if _cache["data"]:
            return _cache["data"]  # serve the old reading rather than failing
        raise HTTPException(status_code=503, detail="Weather service unavailable")

    weather_code = current["weathercode"]
    _cache["data"] = {
        "city": "Windsor",
        "temp": round(current["temperature"]),
        "condition": WEATHER_CODES.get(weather_code, "Clear")
    } #might add more weather data later (future updates)
    _cache["fetched_at"] = time.time()
    return _cache["data"]
