const express = require('express')

const router = express.Router()

const jwt = require('jsonwebtoken')

router.get('/:token',(req,res)=>{

    try{
        const { token } = req.params

        if(jwt.verify(token,'secret')){
            const user = jwt.verify(token,'secret')
            console.log(user);
            if(user.rol == 'client'){
                res.render('client')
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