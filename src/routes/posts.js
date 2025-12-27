import express from "express";
import Post from "../models/Post.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const { content } = req.body;

    const post = await Post.create({
      content,
      userId: req.userId,
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.aggregate([
      {
        $lookup: {
          from: "users",       
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          content: 1,
          createdAt: 1,
          updatedAt: 1,
          "user._id": 1,
          "user.name": 1,
        },
      },
      { $sort: { createdAt: -1 } },
    ]);

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!post) {
      return res.status(403).json({ message: "Not authorized" });
    }

    post.content = req.body.content || post.content;
    await post.save();

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!post) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
