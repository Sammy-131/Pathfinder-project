import "./WeatherOverlay.css";

interface WeatherProps {
  weather: { temp: number; condition: string } | null;
  loading: boolean;
  error: string | null;
}

const ICONS: Record<string, string> = {
  Clear:        "☀️",
  Cloudy:       "☁️",
  "Partly Cloudy": "⛅",
  Rain:         "🌧️",
  Drizzle:      "🌦️",
  Thunderstorm: "⛈️",
  Snow:         "❄️",
  Fog:          "🌫️",
  Mist:         "🌫️",
} // Icon names didnt match the same name in the back end so i changed the names but kept the icons the same

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