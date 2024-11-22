const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use("/uploads", express.static("uploads"));

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/BlogginWeb");

// AUTHENTICATION ROUTES
app.use("/user", require("./Routes/Auth"));

// IDENTIFICATION OF LOGGED IN USER
app.use("/user", require("./Routes/LoggedUser"));

// BLOG ROUTES
app.use("/blog", require("./Routes/BlogRoutes"));

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
