const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord
} = require("../controllers/recordController");

router.post("/", auth, role([1]), createRecord);
router.get("/", auth, getRecords);
router.put("/:id", auth, role([1]), updateRecord);
router.delete("/:id", auth, role([1]), deleteRecord);

module.exports = router;