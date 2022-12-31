import React from 'react'
import Navbar from "./components/navbar/navbar"
import Login from "./components/Login/Login"
import Register  from "./components/Register/Register"
import About from "./components/About/About"
import Home from "./components/Home/Home"
import Logout from "./components/Logout/Logout"
import Contact from "./components/Contact/Contact"
import Notfound from "./components/Notfound/Notfound"
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          {/* <Route path="/home" element={<Home />}/> */}
          <Route path="/about" element={<About />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/logout" element={<Logout />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route path="*" element={<Notfound />}/>
        </Routes>
      </Router>
    </>

  )
}

export default App

