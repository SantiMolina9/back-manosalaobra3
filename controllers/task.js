const Task = require('../models/task')
const Story = require('../models/story')
const mongoose = require('mongoose')
//Crear una tarea
module.exports.createTask = (req, res) => {
    const task = new Task({
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        story: req.body.story,
        start: req.body.start, 
        end: req.body.end,
        status: req.body.status,
        geolong: req.body.geolong,
        geolat: req.body.geolat
    })

    task.save() 
    .then(task => res.status(201).json(
        {
            message: "Tarea creada con exito", 
            data: task  
        }
    ))
}    
//Obtener todas las tareas
module.exports.getTasks = (req, res) => {
    Task.find().then(
        tasks => {
            res.status(200).json({
                message: "Tareas encontradas", 
                data: tasks
            })
        }
    )
}

module.exports.getTasksByStory = (req, res) => {
    const storyId = req.params.id
    if (!mongoose.Types.ObjectId.isValid(storyId)) {
        return res.status(400).json({
            message: "Error",
            data: { id: "El ID proporcionado no es valido" }
        })
    }
    if(storyId == null || storyId == undefined){
        res.status(400).json({
            message: "Error",
            data: {id: "El id es erroneo"}
        })
    }else{
        Story.findById(storyId).then(
            story => {
                if(story){
                    Task.find({story: story._id}).then(
                        tasks => {
                            res.status(200).json({
                                message: "Tareas encontradas", 
                                data: tasks
                            })
                        }
                    )
                }
            }
        )
    }
}
//Obtener una tarea por ID
module.exports.getTaskById = (req, res) => {
    const id = req.params.id
    Task.findById(id)
        .then(
            task => {
                res.status(200).json({
                    message: "Tarea encontrada",
                    data: task
                })
            }
        )   
}
//Editar una tarea
module.exports.editTaskById = (req, res) => {
    const id = req.params.id
    Task.findById(id)
        .then(
            task => {
                
                task.title = req.body.title
                task.description = req.body.description
                task.start = new Date(req.body.start) 
                task.end = new Date(req.body.end)
                task.status = req.body.status
                task.geolong = req.body.geolong
                task.geolat = req.body.geolat

                task.save().then(task => res.json({
                    message: "Tarea editada correctamente",
                    data: task
                    })
                )
            }
        ) 
}
//Eliminar una tarea
module.exports.deleteTask = (req, res) => {
    const id = req.params.id
    Task.findByIdAndDelete(id) 
        .then(
            task => {
                res.status(200).json({
                    message: "Tarea eliminada con exito", 
                    data: task
                })
            }
        )
}
