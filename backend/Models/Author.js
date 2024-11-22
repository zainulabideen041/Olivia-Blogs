const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  pic: { type: String },
  totalBlogs: { type: Number, default: 0 },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Author", AdminSchema);
