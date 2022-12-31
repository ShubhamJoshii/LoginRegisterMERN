import React from "react";
import "./Contact.css";
import contact from "../img/phone.png";
import location from "../img/location.png";
import hours from "../img/Hours.png";
import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
function Contact() {
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  let navigate = useNavigate();
  const handleContactInput = async () => {
    try {
      const res = await fetch("/contactData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      });
      const Data = await res.json();
      // console.log(Data)
      setContactData({
        ...contactData,
        name: Data.name,
        email: Data.email,
        phone: Data.phone,
      });
    } catch (err) {
      console.log(err);
      navigate("/login")
    }
  };

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setContactData({ ...contactData, [name]: value });
  };

  const messageSend = async (e) => {
    e.preventDefault();
    try {
      const { name, email, phone, message } = contactData;
      const res = await fetch("/contactsend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name,email,phone,message})
      });

      const Data = await res.json();
      // console.log(Data);
      if(!Data){
        alert("Message Not Send")
      }
      else{
        alert("Message Send")
        setContactData({...contactData,message:""})
      }
    } catch (err) {
      alert("Message Not Send");
      console.log(err);
    }
  };

  useEffect(() => {
    handleContactInput();
  }, []);

  useEffect(() => {
    console.log(contactData);
  }, [contactData]);

  return (
    <div className="Contact">
      <div className="ContactInner">
        <div className="contactData">
          <div className="contactDataTopic">
            <img src={contact} alt="phoneImg" width="25px" />
            <h2>Call Us</h2>
          </div>
          <p>+91-8800243016</p>
          <div className="contactDataTopic">
            <img src={location} alt="phoneImg" width="25px" />
            <h2>Location</h2>
          </div>
          <p>Delhi, India</p>
          <div className="contactDataTopic">
            <img src={hours} alt="phoneImg" width="25px" />
            <h2>Business Hours</h2>
          </div>
          <p>Monday-Friday 9.00 A.M. - 5.00 P.M.</p>
        </div>
        <div className="ContactForm">
          <div>
            <h1>Contact Us</h1>
            <form action="" method="POST">
              <input
                type="text"
                name="name"
                value={contactData.name}
                placeholder="Username"
                onChange={handleInput}
              />
              <br />
              <input
                type="text"
                name="email"
                value={contactData.email}
                placeholder="Email ID"
                onChange={handleInput}
              />
              <br />
              <input
                type="text"
                name="phone"
                value={contactData.phone}
                placeholder="Phone Number"
                onChange={handleInput}
              />
              <br />
              <textarea
                name="message"
                id="message"
                cols="30"
                rows="10"
                value={contactData.message}
                placeholder="Write your Message"
                onChange={handleInput}
              ></textarea>
              <br />
              <input
                type="submit"
                value="Send Message"
                id="messageBtn"
                onClick={messageSend}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
