const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/dashboard", authMiddleware, (req, res) => {

  res.json({
    message: "Welcome to dashboard",
    user: req.user
  });

});
router.post("/create", authMiddleware, async (req, res) => {

  try {

    const { name, description } = req.body;

    const Project = require("../models/Project");

    const project = await Project.create({

      name,
      description,
      createdBy: req.user.id

    });

    res.status(201).json({
      message: "Project created successfully",
      project
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});
router.post("/task/create", authMiddleware, async (req, res) => {

  try {

    const {
      title,
      description,
      assignedTo,
      projectId,
      deadline
    } = req.body;

    const Task = require("../models/Task");

    const task = await Task.create({

      title,
      description,
      assignedTo,
      projectId,
      deadline

    });

    res.status(201).json({
      message: "Task created successfully",
      task
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});
router.put("/task/update/:id", authMiddleware, async (req, res) => {

  try {

    const { status } = req.body;

    const Task = require("../models/Task");

    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    task.status = status;

    await task.save();

    res.status(200).json({
      message: "Task updated successfully",
      task
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});
router.get("/tasks", authMiddleware, async (req, res) => {

  try {

    const Task = require("../models/Task");

    const tasks = await Task.findAll();

    res.status(200).json(tasks);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});
router.get("/stats", authMiddleware, async (req, res) => {

  try {

    const Task = require("../models/Task");

    const totalTasks = await Task.count();

    const completedTasks = await Task.count({
      where: {
        status: "Completed"
      }
    });

    const pendingTasks = await Task.count({
      where: {
        status: "Pending"
      }
    });

    const inProgressTasks = await Task.count({
      where: {
        status: "In Progress"
      }
    });

    res.status(200).json({

      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressTasks

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});
const { Op } = require("sequelize");

router.get("/overdue", authMiddleware, async (req, res) => {

  try {

    const Task = require("../models/Task");

    const overdueTasks = await Task.findAll({

      where: {

        deadline: {
          [Op.lt]: new Date()
        },

        status: {
          [Op.ne]: "Completed"
        }

      }

    });

    res.status(200).json(overdueTasks);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

module.exports = router;