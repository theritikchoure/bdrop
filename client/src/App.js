import { Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import Home from "./pages/home/index";
import Join from "./pages/join/index";

function App() {
  return (
    <div className="App">
      <ToastContainer position="bottom-center"/>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/join" element={ <Join/> } />
      </Routes>
    </div>
  )
}

export default App