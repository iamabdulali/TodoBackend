import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const createTask = async (req, res) => {
  const { title, description } = req.body;

  await Task.create({
    title,
    description,
    user: res.user,
  });

  res.status(201).json({
    success: true,
    message: "Task Created Successfully",
  });
};

export const getMyTasks = async (req, res) => {
  const userId = res.user._id;

  let myTasks = await Task.find({ user: userId });

  res.status(200).json({
    success: true,
    tasks: myTasks,
  });
};

export const updateTask = async (req, res, next) => {
  const taskID = req.params;

  const task = await Task.findById(taskID.id);

  if (!task) {
    return next(new ErrorHandler("Invalid ID", 404));
  }

  task.isCompleted = !task.isCompleted;

  await task.save();

  res.status(200).json({
    success: true,
    message: "Task Updated Successfully",
  });
};

export const deleteTask = async (req, res) => {
  const taskID = req.params;

  const task = await Task.findById(taskID.id);

  if (!task) {
    return next(new ErrorHandler("Invalid ID", 404));
  }
  await task.deleteOne();

  res.status(200).json({
    success: true,
    message: "Task Deleted Successfully",
  });
};
