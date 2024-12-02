const User = require('../models/user')
const {hashSync, genSaltSync} = require('bcryptjs')

module.exports.createUser = (req, res) => {
    const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: hashSync(req.body.password, genSaltSync(10)), //Hasheo la contraseña del usuario 
        name:{
            first: req.body.firstname,
            last: req.body.lastname
        }
    })
    user.save()
        .then(user => res.status(200).json({
            status: "Usuario creado correctamente",
            data: user
        }))
}

module.exports.getUsers = (req, res) => {
    User.find().then(
        users => {
            res.status(200).json({
                message: "Usuarios encontrados", 
                data: users
            })
        }
    )
}

module.exports.getUserById = (req, res) => {
    User.findById(id).select(['-password']) //El metodo select no devuelve el campo especificado si esta con el "-" antes del atributo
    .then(user =>
        res.status(200).json({
        status: "success",
        data: user
        })
    )
}

module.exports.editUser = (req, res) => {
    const id = req.params.id
    User.findById(id)
        .then((user) => {
            user.email = req.body.email || user.email;
            user.username = req.body.username || user.username;
            user.password = req.body.password || user.password;
            user.name.first = req.body.firstname || user.name.first;
            user.name.last = req.body.lastname || user.name.last;
            user.save().then(user => res.status(200).json({
                status: "success",
                data: user
            }))
    })
}

module.exports.deleteUser = (req, res) => {
    const id = req.params.id
    User.findByIdAndDelete(id) 
        .then(
            user => {
                res.status(200).json({
                    message: "Usuario eliminado con exito", 
                    data: user
                })
            }
        )
}