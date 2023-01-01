const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");

// for taking existing Cookies from Frontend
const cookieParser = require("cookie-parser")
app.use(cookieParser())

//Without This req.body will be null
app.use(express.json());

// if(process.env.NODE_ENV == "Production"){
    
    app.get("/",(req,res)=>{
        app.use(express.static(path.resolve(__dirname,"frontend/build")));
        res.status(200).sendFile(path.resolve(__dirname,"frontend/build"));  
    })
// }

const User = require("./Database")

app.use(require("./auth.js"))

app.listen(8000,()=>{
    console.log("Server Connected at Port 8000")
})