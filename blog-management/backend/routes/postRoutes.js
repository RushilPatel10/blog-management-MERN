// backend/routes/postRoutes.js
const express = require("express");
const Post = require("../models/Post");
const router = express.Router();

// Create a new blog post
router.post("/", async (req, res) => {
    const { title, content } = req.body;
    try {
        const newPost = new Post({ title, content });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ error: "Error creating post" });
    }
});

// Get all blog posts
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(400).json({ error: "Error fetching posts" });
    }
});

// Get a single blog post by ID
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: "Post not found" });
        res.status(200).json(post);
    } catch (err) {
        res.status(400).json({ error: "Error fetching post" });
    }
});

// Update a blog post
router.put("/:id", async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPost) return res.status(404).json({ error: "Post not found" });
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(400).json({ error: "Error updating post" });
    }
});

// Delete a blog post
router.delete("/:id", async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) return res.status(404).json({ error: "Post not found" });
        res.status(200).json({ message: "Post deleted" });
    } catch (err) {
        res.status(400).json({ error: "Error deleting post" });
    }
});

module.exports = router;
