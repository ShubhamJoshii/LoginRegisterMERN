import React from 'react'
import "./About.css"
import profile from "../img/profile.png"
import shubham from "../img/Shubham.jpg"
import facebook from "../img/facebookk.png"
import instagram from "../img/Insta.png"
import linkedin from "../img/Linkedin.png"
import github from "../img/github.png"
import twitter from "../img/Twitter.png"

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
      {/* <div className='profile'> */}
        <img src={ cokkiesData.name === "Shubham Joshi"? shubham :profile} id="profilePic" alt="profilePic" width="250px" />
        <button className='picChange'>Upload Photo</button>
      {/* </div> */}
        <h3>Social Media</h3>
        <div>
          <a href={cokkiesData.instagram} target="_blank" rel="noreferrer"> <img src={instagram} alt="" width="15px"/> Instagram</a>
          <a href={cokkiesData.facebook} target="_blank" rel="noreferrer"> <img src={facebook} alt="" width="15px"/> Facebook</a>
          <a href={cokkiesData.github} target="_blank" rel="noreferrer"> <img src={github} alt="" width="15px" /> Github</a>
          <a href={cokkiesData.linkedin} target="_blank" rel="noreferrer"> <img src={linkedin} alt="" width="15px"/> Linkedin</a>
          <a href={cokkiesData.twitter} target="_blank" rel="noreferrer"> <img src={twitter} alt="" width="15px"/> Twitter</a>
        </div>
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