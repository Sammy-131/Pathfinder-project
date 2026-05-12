import {MapContainer, TileLayer, Marker, Popup } from 'react-leaflet' //importing react components
import 'leaflet/dist/leaflet.css'


const CAMPUS_CENTER: [number, number] = [42.3034, -83.0660]

export default function MapView() {
  return (
   <div style={{ height: '100vh', width: '100vw', background: 'green' }}>
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
    </div>
  )
}
