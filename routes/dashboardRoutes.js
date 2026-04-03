const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  summary,
  categorySummary,
  recentTransactions,
  monthlySummary
} = require("../controllers/dashboardController");

router.get("/summary", auth, role([1,2,3]), summary);
router.get("/category", auth, role([1,2,3]), categorySummary);
router.get("/recent", auth, role([1,2,3]), recentTransactions);
router.get("/monthly", auth, role([1,2,3]), monthlySummary);

module.exports = router;