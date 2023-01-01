if(process.env.NODE_ENV == "Production"){
    module.exports = require("./prod")
}else{
    module.exports = require("./dev")
}