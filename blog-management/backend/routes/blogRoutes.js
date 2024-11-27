const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const upload = require("../upload");

router.post("/add", upload.single("blogimage"), blogController.addBlog);
router.get("/blogs", blogController.getBlogs);
router.delete("/blogs/:id", blogController.deleteBlog);
router.get("/blogs/:id", blogController.getBlogById);
router.put("/blogs/:id", upload.single("blogimage"), blogController.updateBlog);

module.exports = router;
