// Importing modules
import express from "express";
import RemindersController from "./reminders.controller.js";
import { createReminderValidators } from "./reminders.validator.js";
import authMiddleware from "../../../shared/middlewares/auth.middleware.js";
import permissionMiddleware from "../../../shared/middlewares/permission.middleware.js";

// making the router
const router = express.Router();

// creating a RemindersController instance
const controller = new RemindersController();

/*
    @route POST /api/reminders
    @desc Create a new reminder
    @access Private (requires reminders.create permission)
*/
router.post("/", authMiddleware, permissionMiddleware("reminders.create"), createReminderValidators, controller.createReminder);

// exporting the router
export default router;
