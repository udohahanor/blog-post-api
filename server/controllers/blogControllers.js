const Blog = require("../models/blogModel");

// ROUTES
// GET all blogs
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// GET a single Blog by ID
const getBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return res
        .status(404)
        .json({ message: `Cannot find blog with id ${id}` });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// POST a blog
const createBlog = async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const blog = await Blog.create({ title, content, author });
    res.status(201).json(blog);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

// UPDATE a blog by ID
const updateBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findByIdAndUpdate({ _id: id }, { ...req.body });

    if (!blog) {
      return res
        .status(404)
        .json({ message: `Cannot find user with id ${id}` });
    }

    const updatedBlog = await Blog.findById(id);
    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error(error.message);
    res.status(404).json({ message: error.message });
  }
};

//DELETE a request
const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return res
        .status(404)
        .json({ message: `Cannot find blog with id ${id}` });
    }
    res.status(204).json({ message: `Blog with id ${id} does not exist` });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getBlogs, getBlog, createBlog, updateBlog, deleteBlog };
