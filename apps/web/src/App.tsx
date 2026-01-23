import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="*" element={<div className="p-6">Not Found</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
