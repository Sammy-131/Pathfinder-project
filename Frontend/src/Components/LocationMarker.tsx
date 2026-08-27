import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'

export default function LocationMarker() {
  const map = useMap()

  useEffect(() => {
    let marker: L.Marker | null = null

    // Custom blue dot icon for current location
    const locationIcon = L.divIcon({
      className: '',
      html: `<div style="
        width: 16px;
        height: 16px;
        background: #4A90E2;
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      "></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    })

    // Watch position in real time
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords
        const latlng: [number, number] = [latitude, longitude]

        // Remove old marker and circle
        if (marker) marker.remove()

        // Add new marker at current location
        marker = L.marker(latlng, { icon: locationIcon })
          .addTo(map)
          .bindPopup('You are here')

      },
      (error) => {
        console.error('Location error:', error)
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000
      }
    )

    // Cleanup when component unmounts
    return () => {
      navigator.geolocation.clearWatch(watchId)
      if (marker) marker.remove()
    }
  }, [map])

  return null
}

export function CenterOnLocation() {
  const map = useMap()

  const handleClick = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      map.setView([pos.coords.latitude, pos.coords.longitude], 18)
    })
  }

  return (
    <button
      className="location-btn"
      onClick={handleClick}
      style={{
        position: 'absolute',
        bottom: '24px',
        right: '24px',
        zIndex: 1000,
        background: 'white',
        border: 'none',
        padding: '8px 14px',
        borderRadius: '8px',
        cursor: 'pointer',
        boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
      }}
    >
      📍 My Location
    </button>
  )
}