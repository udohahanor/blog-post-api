const express = require("express");
const router = express.Router();

const {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogControllers");

// GET all blogs
router.get("/", getBlogs);

// GET a single blog by ID
router.get("/:id", getBlog);

// POST a blog
router.post("/", createBlog);

// UPDATE a blog by ID
router.put("/:id", updateBlog);

//DELETE a blog
router.delete("/:id", deleteBlog);

module.exports = router;
