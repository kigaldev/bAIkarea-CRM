const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { logger } = require("../utils/logger");

/**
 * Middleware to authenticate JWT token
 */
const authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "No token provided, authorization denied" });
    }

    // Verify token
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by id
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (!user.active) {
      return res.status(401).json({ message: "User account is deactivated" });
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    logger.error(`Authentication error: ${error.message}`);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }

    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Middleware to check if user has admin role
 */
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admin role required." });
  }
};

/**
 * Middleware to check if user has technician role
 */
const isTechnician = (req, res, next) => {
  if (
    req.user &&
    (req.user.role === "technician" || req.user.role === "admin")
  ) {
    next();
  } else {
    res
      .status(403)
      .json({ message: "Access denied. Technician role required." });
  }
};

module.exports = {
  authenticate,
  isAdmin,
  isTechnician,
};
