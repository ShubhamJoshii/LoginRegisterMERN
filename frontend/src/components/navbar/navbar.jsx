import React from 'react'
import "./navbar.css"
import {useNavigate} from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();
  const logoutBtn = async()=>{
    const res = await fetch("/logout",{
      method:"GET",
      headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
      },
      credentials:"include"
    }).then(()=>{
      navigate("/")
    }).catch((err)=>{
      console.log(err)
    })
  }
  return (
    <div className='Navbar'>
      <div id="textLogo"  onClick={()=>{navigate("/")}}>SHUBHAM JOSHI</div>
      <ul className='headerTopic'>
        <li onClick={()=>{navigate("/")}}>Home</li>
        <li onClick={()=>{navigate("/about")}}>About Me</li>
        <li onClick={()=>{navigate("/contact")}}>Contact</li>
        <li onClick={()=>{navigate("/register")}}>Register</li>
        <li onClick={()=>{navigate("/login")}} id="LoginBTN">Login</li>
        <li onClick={logoutBtn} id="LogoutBTN">Logout</li>
      </ul>
      <div className="burger">
        <div className="lines"></div>
        <div className="lines"></div>
        <div className="lines"></div>
      </div>
    </div>
  )
}

export default Navbar