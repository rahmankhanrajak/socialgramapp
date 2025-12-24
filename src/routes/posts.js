import express from "express";
import Post from "../models/Post.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Create post
router.post("/", auth, async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.create({ content, userId: req.userId });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get all posts
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
  