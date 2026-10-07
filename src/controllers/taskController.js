const { Task } = require("../models");

const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      dueDate,
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Task title is required",
      });
    }

    const task = await Task.create({
      title: title.trim(),
      description,
      status,
      priority,
      dueDate,
      userId: req.user.userId,
    });

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    console.error("Create task error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: {
        userId: req.user.userId,
      },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.error("Get tasks error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({
      where: {
        id,
        userId: req.user.userId,
      },
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.error("Get task error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({
      where: {
        id,
        userId: req.user.userId,
      },
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const {
      title,
      description,
      status,
      priority,
      dueDate,
    } = req.body;

    if (title !== undefined && !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Task title cannot be empty",
      });
    }

    await task.update({
      title: title !== undefined ? title.trim() : task.title,
      description:
        description !== undefined
          ? description
          : task.description,
      status: status !== undefined ? status : task.status,
      priority:
        priority !== undefined ? priority : task.priority,
      dueDate: dueDate !== undefined ? dueDate : task.dueDate,
    });

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    console.error("Update task error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({
      where: {
        id,
        userId: req.user.userId,
      },
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    await task.destroy();

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Delete task error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};