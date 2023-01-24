import { Routes, Route } from "react-router-dom"
import Home from "./pages/home/index";
import About from "./About"
// import Contact from "./Contact"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="about" element={ <About/> } />
        {/* <Route path="contact" element={ <Contact/> } /> */}
      </Routes>
    </div>
  )
}

export default App