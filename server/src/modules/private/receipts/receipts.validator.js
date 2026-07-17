// Importing modules
import { body } from "express-validator";
import validateErrors from "../../../shared/utils/validateErrors.util.js";
import mongoose from "mongoose";

const createReceiptValidators = [

    // validating the customerId field
    body("customerId")
        .optional()
        .custom((value) => value === null || mongoose.Types.ObjectId.isValid(value))
        .withMessage("Invalid Customer ID"),

    // validating the invoiceId field
    body("invoiceId")
        .optional()
        .custom((value) => value === null || mongoose.Types.ObjectId.isValid(value))
        .withMessage("Invalid Invoice ID"),

    // validating the receiptNumber field
    body("receiptNumber")
        .notEmpty()
        .withMessage("Receipt number is required")
        .isString(),

    // validating the receiptDate field
    body("receiptDate")
        .notEmpty()
        .withMessage("Receipt date is required")
        .isISO8601()
        .withMessage("Receipt date must be a valid ISO 8601 date"),

    // validating the amount field
    body("amount")
        .notEmpty()
        .withMessage("Receipt amount is required")
        .isFloat({ min: 0.01 })
        .withMessage("Amount must be greater than zero"),

    // validating the paymentMethod field
    body("paymentMethod")
        .notEmpty()
        .withMessage("Payment method is required")
        .isString(),

    // validating the accountId field
    body("accountId")
        .notEmpty()
        .withMessage("Account reference is required")
        .custom((value) => mongoose.Types.ObjectId.isValid(value))
        .withMessage("Invalid Account ID"),

    // validating errors
    validateErrors

];

export { createReceiptValidators };
