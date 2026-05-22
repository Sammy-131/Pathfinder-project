from fastapi import APIRouter
import httpx
import os
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

@router.get("/")
async def get_weather():
    async with httpx.AsyncClient() as client:
        response = await client.get(
            "https://api.open-meteo.com/v1/forecast",
            params={
                "latitude": 42.3034,
                "longitude": -83.0660,
                "current_weather": True,
                "temperature_unit": "celsius"
            }
        )
    data = response.json()
    current = data["current_weather"]
    weather_code = current["weathercode"]

    return {
        "city": "Windsor",
        "temp": round(current["temperature"]),
        "condition": WEATHER_CODES.get(weather_code, "Clear")
    } #might add more weather data later (future updates)
                                    
                                