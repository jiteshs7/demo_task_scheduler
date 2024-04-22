const Task = require("../models/Task");
const sendError = require("../utility/SendError");

// Get all tasks of specific user
exports.getAllTasks = async (req, res, next) => {
  try {
    const result = await Task.find({ user: req.user });

    res.status(200).json({
      sucess: true,
      message: "Tasks fetched!",
      data: result,
    });
  } catch (error) {
    console.log("ERROR", error);
    return next(sendError());
  }
};

// @desc CRUD operations on task

// Create a new task
exports.getTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.status(200).json({
      success: true,
      message: "Task fetched!",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// Create a new task
exports.createTask = async (req, res, next) => {
  try {
    req.body.user = req.user;
    const task = await Task.create(req.body);
    res.status(201).json({
      success: true,
      message: "Task created!",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// Update existing task
exports.updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) return next(sendError(404, "Tasl not found"));
    await task.updateOne(req.body);
    res.status(200).json({
      sucess: true,
      message: "Task updated successfully!",
      data: task,
    });
  } catch (error) {
    console.log("updateTask() Error", error);
    next(sendError());
  }
};

// Delete existing task
exports.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) return next(sendError(404, "Tasl not found"));

    await task.deleteOne();
    res.status(200).json({
      sucess: true,
      message: "Task updated successfully!",
      data: null,
    });
  } catch (error) {
    console.log("deleteTask() Error", error);
    next(sendError());
  }
};
