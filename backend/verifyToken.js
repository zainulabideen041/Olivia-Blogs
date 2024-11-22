const jwt = require("jsonwebtoken");

const JWT_SECRET = "secretcodejwt";

const UserFromToken = (req, res, next) => {
  const token = req.header("token");
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = UserFromToken;
