const bcrypt = require('bcryptjs');
const env = require('dotenv').config();
const User = require('../models/user');
const jwt = require('jsonwebtoken')

module.exports.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {

        User.findOne({ username: username })
            .then((user) => {
                if (!user) {
                    return res.status(401).json({
                        message: "El usuario o contraseña es incorrecto"
                    });
                }

                const result = bcrypt.compareSync(password, user.password);

                if (result) {
                    user.password = undefined;
                    const token = jwt.sign({ user: user }, process.env.JWT_SECRET, {
                        expiresIn: "8h"
                    });

                    return res.status(200).json({
                        status: "success",
                        data: {
                            user: user,
                            token: token,
                            message: "Usuario Autorizado"
                        }
                    });
                } else {
                    return res.status(401).json({
                        message: "El usuario o contraseña es incorrecto"
                    });
                }
            })
            .catch((error) => {
                console.error("Error al buscar el usuario: ", error);
                return res.status(500).json({
                    message: "Error en el servidor"
                });
            });
    } else {
        return res.status(400).json({
            message: "No existe token, debe iniciar sesión!"
        });
    }
};

module.exports.checkToken = (req, res, next) => {
    const token = req.get("auth") //Obtengo el valor del header de la request 
    if(token == null || token == undefined){
        res.status(401).json({
            message: "No existe token, debe iniciar sesion!"
        })
    }
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({
                    success: false,
                    message: "El token es invalido"
                });
                } else {
                    req.userFromJWT = { id: decoded.user.id, _id: decoded.user._id };
                    next();
                }
        })
    }
}