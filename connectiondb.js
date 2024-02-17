const mongoose =  require('mongoose')

const dotenv= require('dotenv')

dotenv.config({path:'./.env'})

const uri = process.env.URI_MONGO

const db = async()=>{
    await mongoose.connect(uri)
}


try{    

    db()
    mongoose.connection.on('open',()=>{
        console.log('Conexion exitosa');
    })

}catch(error){
    mongoose.connection.on('error',()=>{
        console.log(error);
    })
}


module.exports = {db:db}