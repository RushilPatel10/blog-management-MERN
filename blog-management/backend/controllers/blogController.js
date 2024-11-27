const Blog = require("../models/blogModel");

exports.addBlog = async (req, res) => {
    try {
        const { title, name, blogtype, message } = req.body;
        const blogimage = req.file ? req.file.path : null; // File path if image is uploaded

        const newBlog = new Blog({
            title,
            name,
            blogtype,
            blogimage,
            message,
        });

        await newBlog.save();
        res.status(201).json({ message: "Blog added successfully!", blog: newBlog });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json({ message: "Error fetching blogs" });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.id;

        const deletedBlog = await Blog.findByIdAndDelete(blogId);

        if (!deletedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json({ message: "Blog deleted successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting blog" });
    }
};


exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.updateBlog = async (req, res) => {
    try {
        const { title, name, blogtype, message } = req.body;
        const blogimage = req.file ? req.file.path : req.body.existingImage; // Keep old image if none uploaded

        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            { title, name, blogtype, message, blogimage },
            { new: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json({ message: "Blog updated successfully!", blog: updatedBlog });
    } catch (err) {
        res.status(500).json({ message: "Error updating blog", error: err.message });
    }
};