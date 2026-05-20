import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ReportPage from './Components/ReportPage'
import HomePage from './Components/homepage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/report" element={<ReportPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
