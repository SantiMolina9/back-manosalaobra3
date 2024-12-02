const mongoose = require('mongoose');
const env = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const taskRoutes = require("./routes/taskRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const { login } = require('./controllers/auth.js');
const PORT = process.env.PORT || 3002;

app.use(express.json());

app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);
app.use("/login", login);


app.get('/', 
	(req, res) => res.send('¡Hola nodemon!')
);

app.listen(PORT, (err, res) => {
    mongoose.connect(process.env.MONGOCONNECTION);
    console.log("Arranco el server");
});