import express from "express";
import Task from "../models/Task.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const task = new Task({ ...req.body, userId: req.user });
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({error: err.message}); 
  }
});

export default router;