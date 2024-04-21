const express = require("express");

const taskController = require("../controllers/TaskController");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

// Check Authorization
router.all("*", isAuth);

//Get => /task/getAllTasks
router.get("/getAllTasks", taskController.getAllTasks);

//Get => /task/getTask
router.get("/:id", taskController.getTask);

//POST => /task/createTask
router.post("/createTask", taskController.createTask);

//PUT => /task/createTask
router.put("/updateTask/:id", taskController.updateTask);

//DELETE => /task/createTask
router.delete("/deleteTask/:id", taskController.deleteTask);

module.exports = router;
