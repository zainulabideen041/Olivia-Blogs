const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
  },
  author: {
    type: String,
  },
  category: {
    type: String,
    enum: [
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
    ],
  },
  image: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
});

module.exports = mongoose.model("Blog", BlogSchema);
