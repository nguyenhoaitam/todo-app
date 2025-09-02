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
    await Task.findOneAndDelete({_id: req.params.id, userId: req.user});
    res.json({message: "Task deleted"});
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

export default router;
