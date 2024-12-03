const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use("/uploads", express.static("uploads"));

app.use(express.json());
app.use(cors());

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

mongoose.connect(process.env.MONGO_URI);

// AUTHENTICATION ROUTES
app.use("/user", require("./Routes/Auth"));

// IDENTIFICATION OF LOGGED IN USER
app.use("/user", require("./Routes/LoggedUser"));

// BLOG ROUTES
app.use("/blog", require("./Routes/BlogRoutes"));

//DEFAULT ROUTE
app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
