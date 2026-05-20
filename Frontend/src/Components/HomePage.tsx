import { useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './HomePage.css'
import { Link } from 'react-router-dom'
import WeatherOverlay from './WeatherOverlay'
import { useWeather } from '../Hooks/useWeather'
import './WeatherOverlay.css'

const CAMPUS_CENTER: [number, number] = [42.3048, -83.0654]

export default function MapView() {
  const [showSettings, setShowSettings] = useState(false)
  const { weather, loading, error } = useWeather(60000)

  return (
    <div className="home-layout">
      <header className="header">
        <h1 className="Project">Pathfinder</h1>
      </header>

      <div className="toolbar">
        <input
          type="text"
          className="search-bar"
          placeholder="🔍 Search location..."
        />
        <button className="settings-btn" onClick={() => setShowSettings(true)}>
          ⚙ Settings
        </button>
      </div>

      <div className="map-area">
        <div className="map-wrapper">
          <MapContainer
            center={CAMPUS_CENTER}
            zoom={16}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
          <WeatherOverlay weather={weather} loading={loading} error={error} />
        </div>
      </div>

      {showSettings && (
        <div className="modal-overlay" onClick={() => setShowSettings(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Settings</h2>
              <button className="modal-close" onClick={() => setShowSettings(false)}>✕</button>
            </div>
            <div className="modal-body">
              <Link to="/report" className="settings-option">
                Report
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
