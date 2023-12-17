const mongoose = require('mongoose')

const tokenSchema = mongoose.Schema({
    token:{
        type:String,
        required:true,
        unique:true,
    },
    owner:{
        type:mongoose.Types.ObjectId,
        required:true,
        unique:true
    },
    tokenExpriation:{
        type:Date,
        expires:"1h",
        default:Date.now
    }
})

module.exports = mongoose.model("TokenTodo",tokenSchema)