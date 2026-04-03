const pool = require("../config/db");

// GET ALL USERS (Admin only)
exports.getUsers = async (req, res) => {
  try {
    const users = await pool.query(
      `SELECT users.id, name, email, status, roles.role_name
       FROM users
       JOIN roles ON users.role_id = roles.id`
    );

    res.json(users.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET SINGLE USER
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await pool.query(
      `SELECT id, name, email, role_id, status
       FROM users WHERE id=$1`,
      [id]
    );

    if (user.rows.length === 0)
      return res.status(404).json({ message: "User not found" });

    res.json(user.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE USER (Admin)
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role_id } = req.body;

    const result = await pool.query(
      `UPDATE users
       SET name = $1,
           email = $2,
           role_id = $3
       WHERE id = $4
       RETURNING *`,
      [name, email, role_id, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User updated successfully",
      user: result.rows[0]
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE USER STATUS (Active / Inactive)
exports.updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["active", "inactive"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    await pool.query(
      "UPDATE users SET status=$1 WHERE id=$2",
      [status, id]
    );

    res.json({ message: "User status updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE USER (Admin)
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM users WHERE id=$1",
      [id]
    );

    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};