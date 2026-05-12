import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ReportPage from './Components/ReportPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/report" element={<ReportPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App