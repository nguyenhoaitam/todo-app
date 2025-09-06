import express from "express";
import Task from "../models/Task.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const task = new Task({ ...req.body, userId: req.user });
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user },
      req.body,
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Task.findOneAndDelete({ _id: req.params.id, userId: req.user });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.post("/:id/subtasks", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user });
    if (!task) {
      return res.status(404).json({ message: "Không tìm thấy công việc" });
    }
    task.subtasks.push({ title: req.body.title, deadline: req.body.deadline });
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.put("/:id/subtasks/:subId", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user });
  if (!task) {
    return res.status(404).json({ message: "Không tìm thấy công việc" });
  }
  const subtask = task.subtasks.id(req.params.subId)
  if (!subtask) {
    return res.status(404).json({ message: "Không tìm thấy công việc phụ" });
  }

  subtask.completed = !subtask.completed;

  task.status = task.subtasks.every(st => st.completed) ? "done" : "in-progress";

  await task.save();
  res.json(task);
  } catch (err) {
    res.status(500).json({err: err.message});
  }
});

router.delete("/:id/subtasks/:subId", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOne({_id: req.params.id, userId: req.user});
    if (!task) {
      return res.json(404).json({message: "Không tìm thấy công việc"});
    }

    task.subtasks = task.subtasks.filter(
      (st) => st._id.toString() !== req.params.subId
    );

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({err: err.message});
  }
});

export default router;
