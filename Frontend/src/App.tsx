import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ReportPage from './Components/ReportPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
    <div className = "app-layout"> 
      <header className = "top-bar">
        <h1>Campus Map</h1>
      </header>
      <main className = "map-area"> 
        <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/report" element={<ReportPage />} />
      </Routes>
      </main>
    </div>
    </BrowserRouter>
  )
}

export default App