// Importing modules
import { body } from "express-validator";
import validateErrors from "../../../shared/utils/validateErrors.util.js";
import mongoose from "mongoose";

const createPaymentValidators = [

    // validating the vendorId field
    body("vendorId")
        .optional()
        .custom((value) => value === null || mongoose.Types.ObjectId.isValid(value))
        .withMessage("Invalid Vendor ID"),

    // validating the purchaseId field
    body("purchaseId")
        .optional()
        .custom((value) => value === null || mongoose.Types.ObjectId.isValid(value))
        .withMessage("Invalid Purchase ID"),

    // validating the paymentNumber field
    body("paymentNumber")
        .notEmpty()
        .withMessage("Payment number is required")
        .isString(),

    // validating the paymentDate field
    body("paymentDate")
        .notEmpty()
        .withMessage("Payment date is required")
        .isISO8601()
        .withMessage("Payment date must be a valid ISO 8601 date"),

    // validating the amount field
    body("amount")
        .notEmpty()
        .withMessage("Payment amount is required")
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

export { createPaymentValidators };
