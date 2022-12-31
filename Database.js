const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const SECRET_KEY = "SHUBAHMJOSHIISAGOODBOYQWERTYUIOPAS"

mongoose.connect("mongodb+srv://MernProject:ske5QoqNrtXpd4yE@mernproject.y30y9v4.mongodb.net/MernProject?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology : true
}).then(()=>{
    console.log("DataBase Connected")
})

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        require:true
    },
    work:{
        type:String,
        require:true
    },
    time:{
        type:Date,
        default:Date.now()
    },
    password:{
        type:String,
        require:true
    },
    Cpassword:{
        type:String,
        require:true
    },
    messages:[
        {
            name:{
                type:String,
                require:true
            },
            email:{
                type:String,
                require:true
            },
            phone:{
                type:Number,
                require:true
            },
            message:{
                type:String,
                require:true
            }
        }
    ],
    tokens:[{
        token:{
            type:String,
            require:true
        }
    }]
});

userSchema.pre("save",async function(next){
    if (this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12)
        this.Cpassword = await bcrypt.hash(this.Cpassword,12)
        console.log(this);
    }
    next();
})

// Token
userSchema.methods.generateAuthToken =async function(){
    try{
        let token = jwt.sign({_id:this._id},SECRET_KEY);
        this.tokens = this.tokens.concat({token:token})
        await this.save();
        return token; 
    } catch(err){
        console.log(err)
    }
}

// stored a message
userSchema.methods.addMessage = async function(name,email,phone,message){
    try{
        this.messages = this.messages.concat({name,email,phone,message})
        await this.save()
        return this.messages;
    }catch(err){
        console.log(err)
    }
}

const User = new mongoose.model("User",userSchema);

module.exports = User;