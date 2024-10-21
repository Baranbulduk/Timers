import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Timer from './Timer.jsx';
import Analog from './Analog.jsx';
import Digital from './Digital.jsx';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Timer/>} />
          <Route path="/analog" element={<Analog/>} />
          <Route path="/digital" element={<Digital/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
