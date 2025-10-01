import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './components/Landing'
import Confirm from './components/Confirm'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/confirmado" element={<Landing />} />
        <Route path="/error" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App