const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use("/uploads", express.static("uploads"));

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI);

// AUTHENTICATION ROUTES
app.use("/user", require("./Routes/Auth"));

// IDENTIFICATION OF LOGGED IN USER
app.use("/user", require("./Routes/LoggedUser"));

// BLOG ROUTES
app.use("/blog", require("./Routes/BlogRoutes"));

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
