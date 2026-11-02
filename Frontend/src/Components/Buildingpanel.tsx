import './Buildingpanel.css'
import type { RouteInfo } from './Routing'

interface Building {
  id: number
  name: string
  description: string
  latitude: number
  longitude: number
  open_time: string
  close_time: string
  facilities: string[]
  is_open: boolean
}

interface Props {
  building: Building
  onClose: () => void
  onGetDirections: (coords: [number, number]) => void
  route: RouteInfo | null
  onClearDirections: () => void
}

// icl just ask me to explain what i did here im not typing the explanation 

export default function BuildingPanel({building, onClose, onGetDirections, route, onClearDirections }: Props){
    return(
        <div className="building-panel">
      <button className="close-btn" onClick={onClose}>✕</button>

      <div className="panel-content">
      <h2 className="building-name">{building.name}</h2>

      <span className={`status-badge ${building.is_open ? 'open' : 'closed'}`}>
        {building.is_open ? 'Open' : 'Closed'}
      </span>

      <button className="directions-btn" onClick={() => onGetDirections([building.latitude, building.longitude])}>
        Get Directions
      </button>

      {building.description && (
        <div className="panel-section">
          <h3>About</h3>
          <p>{building.description}</p>
        </div>
      )}

      <div className="panel-section">
        <h3>Hours</h3>
        <p>{building.open_time} – {building.close_time}</p>
      </div>

      {building.facilities.length > 0 && (
        <div className="panel-section">
          <h3>Facilities</h3>
          <ul className="facilities-list">
            {building.facilities.map(f => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      )}
      </div>

      {/* slides up over the bottom half of the panel when a route is found */}
      {route && (
        <div className="directions-sheet">
          <div className="directions-header">
            <h3>Directions</h3>
            <button className="clear-directions-btn" onClick={onClearDirections}>Clear</button>
          </div>
          <p className="route-summary">
            {Math.round(route.distance)} m · {Math.ceil(route.time / 60)} min
          </p>
          <ol className="directions-list">
            {route.steps.map((step, i) => (
              <li key={i}>
                <span>{step.text}</span>
                {step.distance > 0 && <span className="step-distance">{Math.round(step.distance)} m</span>}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}

