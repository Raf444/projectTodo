const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:new Date()
    }
})

module.exports = mongoose.model('task',taskSchema)