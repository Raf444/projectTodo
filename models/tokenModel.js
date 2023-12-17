const mongoose = require('mongoose')

const tokenSchema = mongoose.Schema({
    successToken:{
        type:String,
        unique:true,
    },
    refreshToken:{
        type:String,
        unique:true,
    },
    owner:{
        type:mongoose.Types.ObjectId,
        required:true,
        unique:true
    },
    tokenExpriation:{
        type:Date,
        expires:"30d",
        default:Date.now
    }
})

module.exports = mongoose.model("TokenTodo",tokenSchema)