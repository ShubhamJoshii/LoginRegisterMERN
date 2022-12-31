const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("./Database");
const jwt = require("jsonwebtoken");
const Authenication = require("./authenication");
// const path = require("path");

// router.get("/",(req,res)=>{
//   // app.use(Express.static(path.resolve(__dirname,"frontend/build")));
//   // res.status(200).sendFile(path.resolve(__dirname,"frontend/build"));
// });

router.get("/home", Authenication, async (req, res) => {
  res.send(req.rootUser);
});

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, Cpassword } = req.body;
  if (!name || !email || !phone || !work || !password || !Cpassword) {
    return res.send({ message: "Fill Form Properly" });
  }
  try {
    const userExist = await User.findOne({ email });
    if (!userExist) {
      const userData = new User({
        name,
        email,
        phone,
        work,
        password,
        Cpassword,
      });
      const data = await userData.save();
      res.send({ message: "User Registered" });
    } else {
      res.send({ message: "User Already Registered" });
    }
    // console.log(data);
  } catch (err) {
    res.send({ message: "User Not Registered" });
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const userExist = await User.findOne({ email });
    const passwordMatch = await bcrypt.compare(password, userExist.password);
    const token = await userExist.generateAuthToken();
    console.log(token);

    //Cookies Sending
    res.cookie("jwtoken", token, {
      expires: new Date(Date.now() + 25892000000),
      httpOnly: true,
    });

    if (passwordMatch) {
      // console.log(userData);
      res.status(200).send({ message: "User Login" });
    } else {
      res.status(422).send({ message: "User Password Not Match" });
    }
  } catch (err) {
    res.send({ message: "User not Registered" });
    console.log(err);
  }
});

router.get("/about", Authenication, (req, res) => {
  // console.log(req.cookies.jwtoken);
  res.send(req.rootUser);
});

router.post("/contactData", Authenication, (req, res) => {
  res.send(req.rootUser);
});

router.post("/contactsend", Authenication, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    console.log(req.body);
    if (!name || !email || !phone || !message) {
      console.log(name, email, phone, message);
      console.log("plz filled the connect Form");
      return res.json({ error: "plz filled the Connect Form" });
    }
    const userContact = await User.findOne({ _id: req.userID });
    if (userContact) {
      const userUpdate = await userContact.addMessage(
        name,
        email,
        phone,
        message
      );
      await userContact.save();
      res.status(201).json({ message: "User Contact Saved" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("User Logout");
});

module.exports = router;
