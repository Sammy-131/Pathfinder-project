from fastapi import APIRouter
import httpx
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/weather", tags=["weather"])

@router.get("/")
async def get_weather():
    api_key = os.getenv("OPENWEATHER_API_KEY")
    city = os.getenv("OPENWEATHER_CITY")

    async with httpx.AsyncClient() as client:
        response = await client.get("https://api.openweathermap.org/data/2.5/weather",
                                params{
                                    "q": city,
                                    "apikey": api_key,
                                    "units": "metrics"
                                }
        )
    data = response.json

    return {
        "city":             data["name"],
        "temp":             round(data["main"]["temp"])
    }

                                    
                                