const express = require("express");
const User = require("../Models/Author");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { username: user.username, id: user._id },
      JWT_SECRET
    );

    res.json({ message: "Logged in successfully", user, token });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const hashedPassword = await bcryptjs.hash(password, 10);

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const newUser = new User({ username, password: hashedPassword, email });

    const user = await newUser.save();

    const token = jwt.sign(
      { username: user.username, id: user._id },
      JWT_SECRET
    );

    res.json({ message: "User registered successfully", user, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/edit/:id", async (req, res) => {
  const { username, email, image } = req.body;
  const { id } = req.params;
  if (!username && !email) {
    return res.status(400).json({ message: "Username or email is required" });
  }
  const UpdateUser = await User.findByIdAndUpdate(id, {
    username,
    email,
    image,
  });

  if (!UpdateUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ message: "User updated successfully", user: UpdateUser });
});

module.exports = router;
