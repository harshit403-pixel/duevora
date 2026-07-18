// Importing modules
import { body } from "express-validator";
import validateErrors from "../../../shared/utils/validateErrors.util.js";
import mongoose from "mongoose";

const createReminderValidators = [

    // validating the title field
    body("title")
        .notEmpty()
        .withMessage("Reminder title is required")
        .isString(),

    // validating the dueDate field
    body("dueDate")
        .notEmpty()
        .withMessage("Due date is required")
        .isISO8601()
        .withMessage("Due date must be a valid ISO 8601 date"),

    // validating the status field
    body("status")
        .optional()
        .isIn(["pending", "completed"])
        .withMessage("Invalid status"),

    // validating the invoiceId field
    body("invoiceId")
        .optional()
        .custom((v) => v === null || mongoose.Types.ObjectId.isValid(v))
        .withMessage("Invalid Invoice ID"),

    // validating the paymentId field
    body("paymentId")
        .optional()
        .custom((v) => v === null || mongoose.Types.ObjectId.isValid(v))
        .withMessage("Invalid Payment ID"),

    // validating the description field
    body("description")
        .optional()
        .isString(),

    // validating errors
    validateErrors

];

export { createReminderValidators };
