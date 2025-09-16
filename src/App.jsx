// import './App.css'

// import Searchbar from "./components/searchbar"
// import Questions from "./components/questions"

import Home from "./pages/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Analytics />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
