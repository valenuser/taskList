const { TaskModel } = require('../models/TaskModel')

const { db } = require('../connectiondb')


const findTasks = async()=>{
    try{
        const tasks = await TaskModel.find()

        return tasks
    }catch(e){
        console.log(e);
    }
}


const saveTask = async(title,description)=>{

    const newTask = new TaskModel({title:title,description:description,userAssigned:''})

    await newTask.save()

    console.log('task saved!');

}

module.exports = {findTasks}

// const tareas = [
//     {
//         title:'Crear endpoints',
//         description:'crear endpoints para la API'
//     },
//     {
//         title:'Cambiar background',
//         description:'Cambiar background de la pagina de inicio'
//     },
//     {
//         title:'Arreglar bugs',
//         description:"Arreglar bugs de la API en el endpoint '/datos' "
//     },
//     {
//         title:'Buscar mejoras',
//         description:'Buscar mejoras para la pagina de contacto'
//     },
//     {
//         title:'Meeting',
//         description:'Meeting con el departamento de marketing'
//     },
//     {
//         title:'Publicidad',
//         description:'Crear nueva publicidad'
//     },
// ]

// tareas.forEach(el =>{
//     saveTask(el.title,el.description)
// })