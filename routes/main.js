const express = require('express')

const router = express.Router()

const jwt = require('jsonwebtoken')

const { findTasks } = require('../services/TaskService')

const {   findUserId, getAllUsers } = require('../services/UserService')






router.get('/logout',(req,res)=>{
    res.redirect('/')
})



router.get('/:token',async(req,res)=>{

    try{
        const { token } = req.params

        if(jwt.verify(token,'secret')){
            const user = jwt.verify(token,'secret')

            console.log(user);

            if(user.rol == 'administrator'){

                const tasks = await findTasks()

                const userData = await findUserId(user.id)

                const usersList = await getAllUsers()

                if(userData.length != 0 ){

                    const username = userData.name
                    res.render('main',{tasks,username,usersList})
                }

            }else{


                res.render('errorAccess')
            }
        }
    }catch(e){
        res.render('errorAccess')
    }
})





router.use((req,res)=>{
    res.redirect('/')
})

module.exports = router