const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth");

module.exports = {
    login: router.post("", auth.login)
}