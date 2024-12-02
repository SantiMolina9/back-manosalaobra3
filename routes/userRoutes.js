const express = require("express");
const router = express.Router();
const user = require('../controllers/user.js');
const { checkToken } = require("../controllers/auth.js");

router.get('/', checkToken, user.getUsers)

router.get('/:id', checkToken, user.getUserById)

router.post('/', user.createUser)

//Metodo PUT siempre hay que modificar todos los campos del objeto 
router.put('/:id', checkToken, user.editUser)

router.delete('/:id', checkToken, user.deleteUser)

module.exports = router;