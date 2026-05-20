import "./WeatherOverlay.css";

interface WeatherProps {
  weather: { temp: number; condition: string } | null;
  loading: boolean;
  error: string | null;
}

const ICONS: Record<string, string> = {
  Clear:        "☀️",
  Clouds:       "☁️",
  Rain:         "🌧️",
  Drizzle:      "🌦️",
  Thunderstorm: "⛈️",
  Snow:         "❄️",
  Mist:         "🌫️",
  Fog:          "🌫️",
  Haze:         "🌫️",
};

export default function WeatherOverlay({ weather, loading, error }: WeatherProps) {
  if (loading) return <div className="weather-overlay">...</div>;
  if (error || !weather) return (
    <div className="weather-overlay">🌡️ --°C</div>
  );

  return (
    <div className="weather-overlay">
      <span>{ICONS[weather.condition] ?? "🌡️"}</span>
      <span>{weather.temp}°C</span>
    </div>
  );
}