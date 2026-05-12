import { Link } from 'react-router-dom'
import './ReportButton.css'

function ReportButton() {
  return (
    <Link to="/report" className="report-btn">
      Report A Bug
    </Link>
  )
}

export default ReportButton