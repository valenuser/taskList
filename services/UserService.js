const { UserModel } = require('../models/UserModel')


const getAllUsers = async()=>{
    try{
        const allUser = await UserModel.find()
        return allUser
    }catch(e){
        console.log(e);
    }

}

const saveUser = async(name,email,password)=>{

        const newUser = new UserModel({name:name,email:email,password:password})

        await newUser.save()

        console.log('user saved!');

}


const findUser = async(email)=>{
    const user = await UserModel.find({email:email})

    return user
}

const findUserId = async(id)=>{
    const user = await UserModel.findOne({_id:id})

    return user
}

module.exports = {getAllUsers,saveUser,findUser,findUserId}