const { Reminder } = require("../Models/Rem");
const cron = require("node-cron");
const moment = require("moment");

const createReminder = async (req, res) => {
  try {
    const { title, description, duration, notifydate, notifytime, tasks } =
      req.body;

    const userId = req.user._id;

    const newReminder = new Reminder({
      title,
      description,
      duration,
      notifydate,
      notifytime,
      tasks,
      user: userId,
    });

    await newReminder.save();

    res.status(201).json({
      message: "Reminder created successfully",
      reminder: newReminder,
    });
  } catch (error) {
    console.error("Error creating reminder:", error);
    res.status(500).json({
      message: "Error creating reminder",
      error: error.message,
    });
  }
};

const markTaskCompleted = async (req, res) => {
  try {
    const reminderId = req.params.reminderId;
    const taskId = req.params.taskId;

    // Find and update the task's completed field
    const reminder = await Reminder.findOneAndUpdate(
      { _id: reminderId, "tasks._id": taskId },
      { $set: { "tasks.$.completed": true } }, // Update task's completed field
      { new: true } // Return the updated reminder
    );

    if (!reminder) {
      return res.status(404).json({ message: "Reminder or task not found" });
    }

    // Check if all tasks are completed
    const allTasksCompleted = reminder.tasks.every((task) => task.completed);

    if (allTasksCompleted) {
      // Update the reminder as completed
      await Reminder.findByIdAndUpdate(reminderId, { completed: true });
    }

    res.status(200).json({
      message: "Task marked as completed",
      reminder: reminder,
    });
  } catch (error) {
    console.error("Error marking task as completed:", error);
    res.status(500).json({
      message: "Error marking task as completed",
      error: error.message,
    });
  }
};

const getAllReminders = async (req, res) => {
  try {
    const userId = req.user._id;

    const reminders = await Reminder.find({ user: userId });

    res.status(200).json({
      message: "Reminders fetched successfully",
      reminders,
    });
  } catch (error) {
    console.error("Error fetching reminders:", error);
    res.status(500).json({
      message: "Error fetching reminders",
      error: error.message,
    });
  }
};

const getReminderById = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch reminder by ID from the database
    const reminder = await Reminder.findById(id);

    // Check if the reminder was found
    if (!reminder) {
      return res.status(404).json({
        message: "Reminder not found",
      });
    }

    // Send success response
    res.status(200).json({
      message: "Reminder fetched successfully",
      reminder: reminder,
    });
  } catch (error) {
    console.error("Error fetching reminder:", error);
    res
      .status(500)
      .json({ message: "Error fetching reminder", error: error.message });
  }
};

const deleteReminder = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedReminder = await Reminder.findByIdAndDelete(id);

    // Check if the reminder was found and deleted
    if (!deletedReminder) {
      return res.status(404).json({
        message: "Reminder not found",
      });
    }

    // Send success response
    res.status(200).json({
      message: "Reminder deleted successfully",
      reminder: deletedReminder,
    });
  } catch (error) {
    console.error("Error deleting reminder:", error);
    res
      .status(500)
      .json({ message: "Error deleting reminder", error: error.message });
  }
};
const updateReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, duration, notifydate, notifytime, tasks } =
      req.body;

    // Find the reminder by ID and update it
    const updatedReminder = await Reminder.findByIdAndUpdate(
      id,
      {
        title,
        description,
        duration,
        notifydate,
        notifytime,
        tasks,
      },
      { new: true } // Return the updated reminder
    );

    // Check if the reminder was found and updated
    if (!updatedReminder) {
      return res.status(404).json({
        message: "Reminder not found",
      });
    }

    // Send success response
    res.status(200).json({
      message: "Reminder updated successfully",
      reminder: updatedReminder,
    });
  } catch (error) {
    console.error("Error updating reminder:", error);
    res
      .status(500)
      .json({ message: "Error updating reminder", error: error.message });
  }
};
const markReminderCompleted = async (req, res) => {
  try {
    const reminderId = req.params.id;

    // Find the reminder by ID and update its completed status to true
    const updatedReminder = await Reminder.findByIdAndUpdate(
      reminderId,
      { completed: true },
      { new: true } // Return the updated reminder after the update
    );

    if (!updatedReminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }

    // Send success response
    res.status(200).json({
      message: "Reminder marked as completed",
      reminder: updatedReminder,
    });
  } catch (error) {
    console.error("Error updating reminder:", error);
    res.status(500).json({
      message: "Error marking reminder as completed",
      error: error.message,
    });
  }
};

module.exports = {
  createReminder,
  getAllReminders,
  markReminderCompleted,
  markTaskCompleted,
  getReminderById,
  updateReminder,
  deleteReminder,
};
