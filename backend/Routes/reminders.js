const express = require("express");
const router = express.Router();
const {
  createReminder,
  getAllReminders,
  getReminderById,
  updateReminder,
  markReminderCompleted,
  markTaskCompleted,
  deleteReminder,
} = require("../Controllers/ReminderController");
const ensureAuthenticated = require("../Middlewares/Auth");

router.post("/", ensureAuthenticated, createReminder);
router.put("/:id", updateReminder);
router.patch("/:id/complete", markReminderCompleted);
router.patch("/:reminderId/tasks/:taskId/complete", markTaskCompleted);
router.get("/", ensureAuthenticated, getAllReminders);

router.get("/:id", getReminderById);
router.delete("/:id", deleteReminder);

module.exports = router;
