const express = require('express')

const router = express.Router()

const { validationResult, body } = require('express-validator')

const {  saveUser, findUser } = require('../services/UserService')

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

router.get('/',async(req,res)=>{

    res.render('login')
})

router.post('/register',[
    body('username','Ingrese el username correctamente').exists().isLength({max:10,min:5}),
    body('email','Ingrese un email valido').exists().isEmail(),
    body('password','Ingrese una contraseña valida').exists().isLength({max:10,min:5})
],async(req,res)=>{
    const validation = validationResult(req)

    if(!validation.isEmpty()){
        const datos = req.body
        const validaciones =  validation.array()
        res.render('login',{validaciones,datos})
    }else{
        try{
            const { username, password, email } = req.body

            const newPassword = await bcrypt.hash(password,8)
    
            await saveUser(username,email,newPassword)

            const registrado = 'Usuario registrado con exito!'
    
            res.render('login',{registrado})
        }catch(e){
            console.log('email ya utilizado');
            const validaciones = [{msg:'email ya existente.'}]
            res.render('login',{validaciones})
        }
    }
})

router.post('/login',[
    body('email','Ingrese un email valido').exists().isEmail(),
    body('password','Ingrese una contraseña valida').exists().isLength({max:10,min:5})
],async(req,res)=>{

    const validation = validationResult(req)

    if(!validation.isEmpty()){
        const datos = req.body
        const validaciones =  validation.array()
        res.render('login',{validaciones,datos})
    }else{

        const { email,password } = req.body

        const user = await findUser(email)

        console.log(user);
        if(user.length != 0){
            const verifyPassword = bcrypt.compare(user[0].password,password)

            if(verifyPassword){

                const token = jwt.sign({id:user[0]._id,rol:user[0].rol},'secret')

                if(user[0].rol == 'administrator'){
                    res.redirect('/main/'+token)
                }else if(user[0].rol == 'client'){
                    res.redirect('/client/'+token)
                }
            }

        }else{
            const validaciones = [{msg:'Usuario no encontrado'}]
            res.render('login',{validaciones})
        }
    }

})

module.exports = router