import './Buildingpanel.css'

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
}

// icl just ask me to explain what i did here im not typing the explanation 

export default function BuildingPanel({building, onClose }: Props){ 
    return(
        <div className="building-panel">
      <button className="close-btn" onClick={onClose}>✕</button>

      <h2 className="building-name">{building.name}</h2>

      <span className={`status-badge ${building.is_open ? 'open' : 'closed'}`}>
        {building.is_open ? 'Open' : 'Closed'}
      </span>

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
  )
}

