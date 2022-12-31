import React,{useState} from 'react'
import { useEffect } from 'react'
import "./Home.css"
function Home() {
  const [userName,setUserName] = useState("")
  const [show, setShow] = useState(false);
  const dataLoad = async()=>{
    try{

      const res = await fetch("/home",{
        method:"GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials:"include"
      })
    const Data = await res.json();
    console.log(Data)
    setUserName(Data.name);
    setShow(true)
    document.getElementById("LoginBTN").style.display="none"
    document.getElementById("LogoutBTN").style.display="block"
  }catch(err){
    document.getElementById("LoginBTN").style.display="block"
    document.getElementById("LogoutBTN").style.display="none"
    console.log(err);

  }
}
  useEffect(()=>{
    dataLoad();
  },[])
  return (
    <div className='HomePage'>
        <p id='textHome'>Welcome</p>
        <h1>{userName}</h1>
        <h2>{show?"Happy, to see you back":"We Are The MERN Developer"}</h2>
    </div>
  )
}

export default Home