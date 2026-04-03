module.exports = (allowedRoles) => {
  return (req, res, next) => {
    try {
      // Check if user exists (set by authMiddleware)
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Check role
      if (!allowedRoles.includes(req.user.role_id)) {
        return res.status(403).json({
          message: "Access denied: insufficient permissions"
        });
      }

      next();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
};