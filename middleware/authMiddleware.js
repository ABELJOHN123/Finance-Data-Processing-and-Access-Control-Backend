const jwt = require("jsonwebtoken");
const pool = require("../config/db");

module.exports = async (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token)
    return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from DB
    const user = await pool.query(
      "SELECT * FROM users WHERE id=$1",
      [decoded.id]
    );

    if (user.rows.length === 0)
      return res.status(404).json({ message: "User not found" });

    // Check status
    if (user.rows[0].status === "inactive") {
      return res.status(403).json({
        message: "User is inactive"
      });
    }

    req.user = user.rows[0];
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};