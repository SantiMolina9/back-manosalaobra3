const express = require("express");
const router = express.Router();
const task = require('../controllers/task.js');
const { checkToken } = require("../controllers/auth.js");

router.get('/', checkToken, task.getTasks)

router.get('/:id', checkToken, task.getTaskById)

router.post('/',checkToken, task.createTask)

//Metodo PUT siempre hay que modificar todos los campos del objeto 
router.put('/:id', checkToken, task.editTaskById)

router.delete('/:id', task.deleteTask)

module.exports = router;