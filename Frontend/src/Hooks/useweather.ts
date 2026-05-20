import { useState, useEffect } from "react";

interface Weather {
  city: string;
  temp: number;
  condition: string;
}

export function useWeather(refreshInterval = 60000) {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchWeather() {
    try {
      const res = await fetch("http://localhost:8000/weather/");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError("Could not load weather");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, refreshInterval);
    return () => clearInterval(interval);
  }, []);

  return { weather, loading, error };
}