const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  getUsers,
  getUserById,
  updateUser,
  updateUserStatus,
  deleteUser
} = require("../controllers/userController");

// Admin only routes
router.get("/", auth, role([1]), getUsers);
router.get("/:id", auth, role([1]), getUserById);
router.put("/:id", auth, role([1]), updateUser);
router.put("/:id/status", auth, role([1]), updateUserStatus);
router.delete("/:id", auth, role([1]), deleteUser);

module.exports = router;