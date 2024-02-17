const { Schema, model } = require('mongoose')

const TaskSchema = new Schema({
    title:{type:String},
    description:{type:String},
    userAssigned:{type:String},
    state:{type:Boolean,default:false}
})

const TaskModel = model('tasks',TaskSchema)

module.exports = {TaskModel:TaskModel}