import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './components/Landing'
import Confirmado from './components/Confirmado'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/confirmado" element={<Confirmado />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App