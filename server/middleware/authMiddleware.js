const { verifyToken } = require("../utils/jwtUtils");

// Authentication middleware - verifies JWT token
const authenticate = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      // For guest mode, allow request to continue without authentication
      // The authorization middleware will handle role-based access
      req.user = null;
      return next();
    }

    const token = authHeader.substring(7); // Remove "Bearer " prefix
    
    try {
      const decoded = verifyToken(token);
      req.user = {
        userId: decoded.userId,
        email: decoded.email,
        role: decoded.role,
      };
      next();
    } catch (error) {
      // Invalid token - treat as guest
      req.user = null;
      next();
    }
  } catch (error) {
    req.user = null;
    next();
  }
};

module.exports = { authenticate };
