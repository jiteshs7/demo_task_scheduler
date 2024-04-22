const express = require("express");

const userController = require("../controllers/UserController");

const router = express.Router();

//POST => /auth/login
router.post("/login", userController.login);
//POST => /auth/singup
router.post("/signup", userController.signup);

module.exports = router;
