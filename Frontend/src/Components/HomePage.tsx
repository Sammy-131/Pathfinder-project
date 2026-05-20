import { useState } from 'react'
import {MapContainer, TileLayer, Marker, Popup } from 'react-leaflet' //importing react components
import 'leaflet/dist/leaflet.css'
import './HomePage.css'
import { Link } from 'react-router-dom'


const CAMPUS_CENTER: [number, number] = [42.30619513887715, -83.06264293196003]


export default function MapView() {
  const [showSettings, setShowSettings] = useState(false)
  return (
    <div className = "home-layout">
      <header className = "header">
        <h1 className = "Project">Pathfinder</h1>
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



       <div className="map-wrapper">
        <MapContainer
          center={CAMPUS_CENTER}
          zoom={17}
          style={{ height: '100vh', width: '100vw' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
        <div className="overlay-number">42</div>
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
