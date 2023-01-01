import React from "react";
import "./Login.css";
import TopIMG from "../img/Img.png";
import UserLogo from "../img/userLogo.png";
import LockLogo from "../img/lockLogo.png";
import Eyeopen from "../img/eyeOpen.png"
import EyeClose from "../img/eyeClose.png"
import {useNavigate} from "react-router-dom"
import { useState } from "react";
import { useEffect } from "react";
function Login() {
  const [userInput, setUserInput] = useState({
    email:"",password:""
  })
  const navigate = useNavigate();
  const handleLoginInput = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setUserInput({...userInput,[name]:value});
  }

  const handleLoginSave = async(e)=>{
    e.preventDefault()
    const {email, password} = userInput;
    if(password.length >= 8){
      document.getElementsByClassName("inputPassword")[0].style.backgroundColor="#00a4b36b"
      document.getElementsByClassName("inputForm")[0].style.backgroundColor="#00a4b36b"
      try{
        const res = await fetch("/login",{
          "headers":{
            "Content-Type":"application/json",
          },
          "method":"POST",
          "body":JSON.stringify({email,password})
        })
        await res.json();
        alert("User Login")
        navigate("/")
      } catch(err){
        document.getElementsByClassName("inputForm")[0].style.backgroundColor="red"
        alert("User Not Registered")
        console.log(err);
      }
    }
    else{
      document.getElementsByClassName("inputPassword")[0].style.backgroundColor="red"
      alert("Invalid Password")
    }
  }
  useEffect(()=>{
  console.log(userInput);
},[userInput])

const passwordShow = ()=>{
  let a = document.getElementById("password");
  let b = document.getElementById("passwordShow");
  if(a.type === "password"){
    a.type="text";
    b.src=Eyeopen;  
  }
  else{
    a.type="password";
    b.src=EyeClose;
  }
}
  return (
    <div className="Login">
      <img src={TopIMG} alt="" width="350px" />
      <div id="textLogin">User Login</div>
      <form action="" method="POST">
        <div className="inputForm">
          <img src={UserLogo} alt="userLogo" width="20px"/>
          <input type="text" placeholder="Email or Username" name="email" onChange={handleLoginInput} />
        </div>
        <div className="inputForm inputPassword">
          <img src={LockLogo} alt="userLogo" id="logoPassword" width="17px" />
          <input type="password" placeholder="Password" id="password" name="password" onChange={handleLoginInput} />
          <img src={EyeClose} width="20px" alt="passwordShow" onClick={passwordShow} id="passwordShow"/>
        </div>
        <input type="submit" value="Login" id="loginBtn" onClick={handleLoginSave}/>
      </form>
      <p onClick={()=>{navigate("/register")}}>Create Account ?</p>
    </div>
  );
}

export default Login;
