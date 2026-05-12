import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ReportPage from './Components/ReportPage'
import './App.css'
import HomePage from './Components/homepage'

function App() {
  return (
    <BrowserRouter>
    <div className = "app-layout"> 
      <main className = "map-area"> 
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/report" element={<ReportPage />} />
      </Routes>
      </main>
    </div>
    </BrowserRouter>
  )
}

export default App