import React from 'react'
import "./About.css"
import profile from "../img/profile.png"
import shubham from "../img/Shubham.jpg"
import { useEffect } from 'react'
import { useState } from 'react'
import {useNavigate} from "react-router-dom";

function About() {
  const [cokkiesData,setCookieData] = useState({})
  let navigate = useNavigate();
  const callAboutPage = async()=>{
    try{
        const res = await fetch("/about",{
          "method":"GET",
          "headers":{
            Accept:"applicatoin/json",
            "Content-Type":"application/json"
          },
          credentials: 'include'
        })

        const Data =await res.json();
        console.log(Data);
        setCookieData(Data);
    } catch(err){
      navigate("/login")
      console.log(err);
    }
  }
  useEffect(()=>{
    callAboutPage();
  },[])
  return (
    <div className='About'>
    <div className='AboutInner'>
      <div className='About1Half'>
        <img src={ cokkiesData.name === "Shubham Joshi"? shubham :profile} id="profilePic" alt="profilePic" width="250px" />
        <h3>Social Media</h3>
        <a href="/">Instagram</a>
        <a href="/">Facebook</a>
        <a href="/">Github</a>
        <a href="/">Linkedin</a>
        <a href="/">Twitter</a>
      </div>
      <div className='About2Half'>
        <div>
        <h1>{cokkiesData.name}</h1>
        <h3>{cokkiesData.work}</h3>
        </div>
        <table>
          <h2>Details</h2>
          <tr>
            <td className='detailsTopic'>Id:</td>
            <td>{cokkiesData._id}</td>
          </tr>
          <tr>
            <td className='detailsTopic'>Name:</td>
            <td>{cokkiesData.name}</td>
          </tr>
          <tr>
            <td className='detailsTopic'>Phone Number:</td>
            <td>{cokkiesData.phone}</td>
          </tr>
          <tr>
            <td className='detailsTopic'>Email ID:</td>
            <td>{cokkiesData.email}</td>
          </tr>
          <tr>
            <td className='detailsTopic'>Work</td>
            <td>{cokkiesData.work}</td>
          </tr>
          <tr>

          </tr>
        </table>

      </div>
    </div>
    </div>
  )
}

export default About