import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './HomePage.css'
import { Link } from 'react-router-dom'
import WeatherOverlay from './WeatherOverlay'
import { useWeather } from '../Hooks/useWeather'
import './WeatherOverlay.css'
import BuildingPanel from './Buildingpanel'
import Footer from './Footer'
import LocationMarker, { CenterOnLocation } from './LocationMarker'

const CAMPUS_CENTER: [number, number] = [42.3048, -83.0654]



export default function MapView() {
  const [showSettings, setShowSettings] = useState(false)
  const { weather, loading, error } = useWeather(60000)
  const [buildings, setBuildings] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showResults, setShowResults] = useState(false)

  /*just a placeholder building to to help me design */
  const [selectedBuilding, setSelectedBuilding] = useState<any>(null)
  
  /*use this for the place holder just replace null with the building object*/
  /*{
  id: 1,
  name: "Centre for Engineering Innovation",
  description: "Engineering and computer science building",
  latitude: 42.3048,
  longitude: -83.0654,
  open_time: "08:00",
  close_time: "22:00",
  facilities: ["Labs", "Classrooms", "Study Rooms"],
  is_open: true
}*/

  useEffect(() => {
    fetch('http://localhost:8000/buildings/')
      .then(res => res.json())
      .then(data => setBuildings(data))
  }, [])

  useEffect(() => {
        if (searchQuery.trim() === '') {
          setSearchResults([])
          setShowResults(false)
          return
        }

        const timeout = setTimeout(() => {
          fetch(`http://localhost:8000/buildings/?q=${searchQuery}`)
            .then(res => res.json())
            .then(data => {
              setSearchResults(data)
              setShowResults(true)
            })
        }, 300) // waits 300ms after typing stops before searching

        return () => clearTimeout(timeout)
      }, [searchQuery])

  return (
    <div className="home-layout">
      <header className="header">
        <h1 className="project-name">Pathfinder</h1>
      </header>

      <div className="toolbar">
        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            placeholder="🔍 Search buildings, rooms, facilities..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onFocus={() => searchResults.length > 0 && setShowResults(true)}
            onBlur={() => setTimeout(() => setShowResults(false), 200)}
            onKeyDown={e => {
              if (e.key === 'Enter' && searchResults.length > 0) {
                setSelectedBuilding(searchResults[0])
                setSearchQuery('')
                setShowResults(false)
              }
            }}
          />
          {showResults && searchResults.length > 0 && (
            <div className="search-dropdown">
              {searchResults.map(building => (
                <div
                  key={building.id}
                  className="search-result-item"
                  onClick={() => {
                    setSelectedBuilding(building)
                    setSearchQuery('')
                    setShowResults(false)
                  }}
                >
                  <span className="result-name">{building.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <button className="settings-btn" onClick={() => setShowSettings(true)}>
          ⚙ Settings
        </button>
      </div>

      
      
      
      <div className="map-area">

        {/* moved this here so that the building panel is a sibling of the map wrapper and also a panel slot so the map dosent fill the wraper when the panel is closed */}
        <div className="panel-slot">
        {selectedBuilding && (
          <BuildingPanel
            building={selectedBuilding}
            onClose={() => setSelectedBuilding(null)}
          />
        )}
        </div>
      

        <div className="map-wrapper">
          <MapContainer
            center={CAMPUS_CENTER}
            zoom={16}
            style={{ height: '100%', width: '100%' }}
          >
            <LocationMarker />
            <CenterOnLocation />
            {buildings.map(building => ( // this handles what happends whenyou click on the marker
              <Marker
                key={building.id}
                position={[building.latitude, building.longitude]}
                eventHandlers={{
                  click: () => {
                    console.log('building clicked:', building)
                    setSelectedBuilding(building)}
                }}
              >
                <Popup>{building.name}</Popup>
              </Marker>
            ))}

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
      
      {/* fixed footer */}
      <Footer />
    </div>
  )
}
