// Authorization middleware - checks user role
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    // Guest users (req.user is null) can only access read operations
    if (!req.user) {
      // For GET requests, allow guest access
      if (req.method === "GET") {
        return next();
      }
      // For other methods, require authentication
      return res.status(401).json({
        message: "Authentication required. Please login to access this resource.",
      });
    }

    // Check if user's role is in allowed roles
    if (allowedRoles.includes(req.user.role)) {
      return next();
    }

    // User is authenticated but doesn't have required role
    return res.status(403).json({
      message: "Access denied. Insufficient permissions.",
    });
  };
};

// Admin-only middleware
const requireAdmin = authorize("admin");

// Authenticated user middleware (any logged-in user)
const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Authentication required. Please login to access this resource.",
    });
  }
  next();
};

module.exports = {
  authorize,
  requireAdmin,
  requireAuth,
};
