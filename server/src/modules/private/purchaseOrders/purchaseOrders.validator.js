// Importing modules
import { body } from "express-validator";
import validateErrors from "../../../shared/utils/validateErrors.util.js";
import mongoose from "mongoose";

const createPurchaseOrderValidators = [

    // validating the vendorId field
    body("vendorId")
        .notEmpty()
        .withMessage("Vendor ID is required")
        .custom((value) => mongoose.Types.ObjectId.isValid(value))
        .withMessage("Invalid Vendor ID"),

    // validating the poNumber field
    body("poNumber")
        .notEmpty()
        .withMessage("PO number is required")
        .isString(),

    // validating the poDate field
    body("poDate")
        .notEmpty()
        .withMessage("PO date is required")
        .isISO8601()
        .withMessage("PO date must be a valid ISO 8601 date"),

    // validating the grandTotal field
    body("grandTotal")
        .notEmpty()
        .withMessage("Grand total is required")
        .isFloat({ min: 0 })
        .withMessage("Grand total cannot be negative"),

    // validating the status field
    body("status")
        .optional()
        .isIn(["draft", "sent", "ordered", "received", "cancelled"])
        .withMessage("Invalid status"),

    // validating errors
    validateErrors

];

export { createPurchaseOrderValidators };
