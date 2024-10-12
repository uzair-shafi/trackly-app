const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User");

const ensureAuthenticated = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await UserModel.findById(decoded._id); // Fetch user from DB
    if (!req.user) {
      return res.status(403).json({ message: "User not found" });
    }
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = ensureAuthenticated;
