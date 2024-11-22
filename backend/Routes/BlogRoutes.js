const express = require("express");
const Blog = require("../Models/Blog");
const Author = require("../Models/Author");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

//ROUTE TO CREATE NEW BLOG
router.post("/create/:id", upload.single("image"), async (req, res) => {
  const { title, content, category, date } = req.body;
  const { id } = req.params;

  const authorExists = await Author.findById(id);
  authorExists.totalBlogs = totalBlogs + 1;
  authorExists.save();
  const authorName = authorExists.username;

  if (!title || !content) {
    return res.status(400).json({ message: "Title, content are required" });
  }

  const imagePath = req.file ? req.file.path : null;

  try {
    const newBlog = await Blog.create({
      title,
      content,
      author: authorName,
      date,
      category,
      authorId: id,
      image: imagePath,
    });
    res
      .status(201)
      .json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create blog", error: error.message });
  }
});

//ROUTE TO UPDATE EXISTING BLOG
router.post("/update/:id", upload.single("image"), async (req, res) => {
  const id = req.params.id;
  const { title, content, category } = req.body;

  const date = new Date();

  const imagePath = req.file ? req.file.path : null;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, content, category, date, image: imagePath },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update blog", error: error.message });
  }
});

// ROUTE TO DISPLAY ALL EXISTING BLOGS
router.get("/display", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve blogs", error: error.message });
  }
});

// DISPLAY SPECIFIC BLOG USING ID
router.get("/blog/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve blog", error: error.message });
  }
});

// ROUTE TO DELETE EXISTING BLOG
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const authorId = await Blog.findById(id, "authorId");
    const deletedBlog = await Blog.findByIdAndDelete(id);
    const author = await Author.findById(authorId);
    author.totalBlogs = totalBlogs - 1;
    author.save();

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete blog", error: error.message });
  }
});

// DISPLAY BLOGS TO THEIR AUTHORS ONLY
router.get("/author/blogs/:id", async (req, res) => {
  const id = req.params.id;
  const authorBlogs = await Blog.find({
    authorId: id,
  });
  if (!authorBlogs) {
    return res.status(404).json({ message: "No blogs found for this author" });
  }
  res.json(authorBlogs);
});

// DISPLAY ALL EXISTING CATEGORIES
router.get("/categories", async (req, res) => {
  const categories = [
    "Technology",
    "Sports",
    "Politics",
    "Business",
    "Science",
    "World",
    "Entertainment",
    "Health",
    "Development",
    "Education",
    "Science/Tech",
    "Social Media",
    "Religion",
    "Music",
    "Lifestyle",
    "Fashion",
    "Food",
    "Travel",
    "Art",
    "Environment",
    "Economy",
    "Relationships",
    "Family",
    "Drugs",
  ];
  res.json(categories);
});

//DISPLAY ALL UNIQUE AUTHORS
router.get("/authors", async (req, res) => {
  try {
    // Get all unique authors from the Blog collection
    const authorid = await Blog.distinct("authorId");

    const Authors = await Author.find({
      _id: { $in: authorid },
    });

    if (!Authors.length) {
      return res.status(404).json({ message: "No authors found" });
    }

    res.status(200).json({ Authors });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch authors", error: error.message });
  }
});

module.exports = router;
