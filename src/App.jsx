import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import './App.css'
import LuckyDrawWheel from './LuckyDrawWheel'
import FrontPage from './FrontPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
     
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/participate" element={<LuckyDrawWheel />} />
      </Routes>
    </Router>


    
     
    </>
  )
}

export default App
