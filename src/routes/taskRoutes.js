import express from "express";
import Task from "../models/Task.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply auth middleware
router.use(authMiddleware);

//Creating a new task route
router.post("/", async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const task = new Task({
      title,
      description,
      completed: completed || false,
      owner: req.user._id,
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Return only tasks belonging to the user
router.get("/", async (req, res) => {
  try {r
    const tasks = await Task.find({ owner: req.user._id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE /api/tasks/:id
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // - Check ownership
    if (task.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Not authorized" });
    }

    // - Delete task
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;