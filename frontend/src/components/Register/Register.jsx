import React,{useState} from 'react'
import "./Register.css"
import TopIMG from "../img/Img.png";
import UserLogo from "../img/userLogo.png";
import LockLogo from "../img/lockLogo.png";
import Eyeopen from "../img/eyeOpen.png";
import EyeClose from "../img/eyeClose.png";
import phone from "../img/phone.png";
import email from "../img/email.png";
import {useNavigate} from "react-router-dom";


function Register() {
  const [registerData ,setRegisterData] = useState({
    name:"",email:"",phone:"",work:"",password:"",Cpassword:""
  })
  const navigate = useNavigate();
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

  const ConfirmpasswordShow = ()=>{
    let a = document.getElementById("Confirmpassword");
    let b = document.getElementById("ConfirmpasswordShow");
    if(a.type === "password"){
      a.type="text";
      b.src=Eyeopen;  
    }
    else{
      a.type="password";
      b.src=EyeClose;
    }}

    const handleInputRegister = (e)=>{
      const name = e.target.name;
      const value = e.target.value;
      setRegisterData({...registerData,[name]:value});
    }

    const handleRegister = async(e)=>{
      e.preventDefault();
      try{
        const {name,email,phone,work,password,Cpassword} = registerData;
        if(!name || !email || !phone || !work || !password || !Cpassword || password.length <= 8 || Cpassword.length<=8){
          document.getElementsByClassName("inputPassword")[0].style.backgroundColor="red";
          document.getElementsByClassName("inputPassword")[1].style.backgroundColor="red";
          alert("Fill Form Properly")
        }
        else if(!(password === Cpassword)){
          document.getElementsByClassName("inputPassword")[0].style.backgroundColor="red";
          document.getElementsByClassName("inputPassword")[1].style.backgroundColor="red";
          alert("Invaild Password");
        }
        else{
          document.getElementsByClassName("inputPassword")[0].style.backgroundColor="#00a4b36b";
          document.getElementsByClassName("inputPassword")[1].style.backgroundColor="#00a4b36b";
          console.log(registerData);
          const res = await fetch("/register",{
            "method":"POST",
            "headers":{
              "Content-Type":"application/json"
            },
            "body":JSON.stringify({name,email,phone,work,password,Cpassword})
          })
          await res.json();
          alert("User Registered")
          navigate("/login")
        }
      } catch(err){
        console.log(err)
      }
    }

  return (
    <div className="Register">
      <img src={TopIMG} alt="" width="450px" height="250px"  id='userLogo'/>
      <div id="textLogin">User Register</div>
      <form action="">
        <div className="registerForm">
          <img src={UserLogo} alt="userLogo" width="20px"/>
          <input type="text" placeholder="Enter Name" name='name' onChange={handleInputRegister}/>
        </div>
        <div className="registerForm">
          <img src={email} alt="userLogo" width="20px" />
          <input type="text" placeholder="Email ID" name='email'  onChange={handleInputRegister}/>
        </div>
        <div className="registerForm">
          <img src={phone} alt="userLogo" width="20px" />
          <input type="text" placeholder="Phone Number" name='phone' onChange={handleInputRegister}/>
        </div>
        <div className="registerForm">
          <img src={UserLogo} alt="userLogo" width="20px" />
          <input type="text" placeholder="Work" name='work' onChange={handleInputRegister}/>
        </div>
        <div className="registerForm inputPassword">
          <img src={LockLogo} alt="userLogo" width="17px" id='logoPassword'/>
          <input type="password" placeholder="Password" id='password' name='password' onChange={handleInputRegister}/>
          <img src={EyeClose} width="20px" alt="passwordShow" onClick={passwordShow} id="passwordShow"/>
        </div>
        <div className="registerForm inputPassword">
          <img src={LockLogo} alt="userLogo" width="17px"  id='logoPassword'/>
          <input type="password" placeholder="Confirm Password" id='Confirmpassword' name='Cpassword'  onChange={handleInputRegister}/>
          <img src={EyeClose} width="20px" alt="passwordShow" onClick={ConfirmpasswordShow} id="ConfirmpasswordShow"/>

        </div>
        <input type="submit" value="Register" id="loginBtn" onClick={handleRegister}/>
      </form>
      <p onClick={()=>{navigate("/login")}}>Login</p>
    </div>
  );
}

export default Register;