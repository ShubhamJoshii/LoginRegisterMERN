const jwt = require("jsonwebtoken");
const User = require("./Database");
const SECRET_KEY = "SHUBAHMJOSHIISAGOODBOYQWERTYUIOPAS"
const Authenication = async (req,res,next)=>{
    try{
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token,SECRET_KEY)
        // console.log(verifyToken);
        const rootUser = await User.findOne({_id:verifyToken._id,"tokens.token":token})
        // console.log(rootUser);
        if(!rootUser){
            throw new Error("User Not Found");
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id; 
        next();
    } catch(err){
        res.status(401).send("Unauthorized:No token provided")
        console.log(err,"Authenication Error")
    }
}

module.exports = Authenication;