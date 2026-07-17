// Importing modules
import { body } from "express-validator";
import validateErrors from "../../../shared/utils/validateErrors.util.js";
import mongoose from "mongoose";

const createExpenseValidators = [

    // validating the expenseNumber field
    body("expenseNumber")
        .notEmpty()
        .withMessage("Expense number is required")
        .isString(),

    // validating the date field
    body("date")
        .notEmpty()
        .withMessage("Date is required")
        .isISO8601()
        .withMessage("Date must be a valid ISO 8601 date"),

    // validating the amount field
    body("amount")
        .notEmpty()
        .withMessage("Amount is required")
        .isFloat({ min: 0.01 })
        .withMessage("Amount must be greater than zero"),

    // validating the categoryId field
    body("categoryId")
        .optional()
        .custom((value) => value === null || mongoose.Types.ObjectId.isValid(value))
        .withMessage("Invalid Category ID"),

    // validating the accountId field
    body("accountId")
        .notEmpty()
        .withMessage("Account reference is required")
        .custom((value) => mongoose.Types.ObjectId.isValid(value))
        .withMessage("Invalid Account ID"),

    // validating the description field
    body("description")
        .optional()
        .isString(),

    // validating errors
    validateErrors

];

export { createExpenseValidators };
