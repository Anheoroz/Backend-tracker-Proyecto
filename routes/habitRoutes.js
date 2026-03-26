const express = require("express");
const router = express.Router();

const {
  createHabit,
  getHabits,
  updateHabit,
  deleteHabit,
  marcarHabitComoDone
} = require("../controllers/habitController");

router.post("/", createHabit);
router.get("/", getHabits);
router.put("/:id", updateHabit);
router.delete("/:id", deleteHabit);
router.put('/:id/done', marcarHabitComoDone);

module.exports = router;