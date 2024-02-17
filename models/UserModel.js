const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    name:{type:String, unique:true},
    email:{type:String,unique:true},
    password:{type:String},
    rol:{type:String,default:'client'},
    taskList:[]
})

const UserModel = model('users',UserSchema)

module.exports = {UserModel:UserModel}