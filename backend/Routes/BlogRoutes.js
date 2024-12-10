const express = require("express");
const Blog = require("../Models/Blog");
const Author = require("../Models/Author");
const router = express.Router();

//ROUTE TO CREATE NEW BLOG
router.post("/create/:id", async (req, res) => {
  const { title, content, category, image } = req.body;
  const { id } = req.params;

  try {
    // Validate input data
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    // Check if author exists
    const authorExists = await Author.findById(id);
    if (!authorExists) {
      return res.status(404).json({ message: "Author not found" });
    }

    const date = Date.now();

    // Create the blog (with or without image)
    const newBlog = await Blog.create({
      title,
      content,
      author: authorExists.username,
      date,
      category,
      authorId: id,
      image,
    });

    // Increment author's blog count safely
    authorExists.totalBlogs = authorExists.totalBlogs + 1;
    await authorExists.save();

    res
      .status(201)
      .json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    console.log("Error creating blog:", error.message);
    res
      .status(500)
      .json({ message: "Failed to create blog", error: error.message });
  }
});

//ROUTE TO UPDATE EXISTING BLOG
router.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const { title, content, category, image } = req.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, content, category, image },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.json({
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    return res
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
    // Find the blog and get the authorId from the blog
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const authorId = blog.authorId; // Use the authorId from the blog
    const author = await Author.findById(authorId);

    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    // Decrement the totalBlogs count for the author
    author.totalBlogs = author.totalBlogs - 1;
    await author.save(); // Ensure saving the updated author data

    // Delete the blog post
    const deletedBlog = await Blog.findByIdAndDelete(id);

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
    "Jokes",
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
    "Testing",
    "Fun",
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
