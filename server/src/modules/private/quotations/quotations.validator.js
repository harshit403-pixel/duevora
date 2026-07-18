// Importing modules
import { body, param } from "express-validator";
import validateErrors from "../../../shared/utils/validateErrors.util.js";
import mongoose from "mongoose";

const createQuotationValidators = [

    // validating the customerId field
    body("customerId")
        .notEmpty()
        .withMessage("Customer is required")
        .custom((v) => mongoose.Types.ObjectId.isValid(v))
        .withMessage("Invalid Customer ID"),

    // validating the quotationNumber field
    body("quotationNumber")
        .notEmpty()
        .withMessage("Quotation number is required")
        .isString(),

    // validating the date field
    body("date")
        .notEmpty()
        .withMessage("Date is required")
        .isISO8601()
        .withMessage("Must be a valid date"),

    // validating the expiryDate field
    body("expiryDate")
        .optional()
        .isISO8601()
        .withMessage("Must be a valid date"),

    // validating the subTotal field
    body("subTotal")
        .notEmpty()
        .withMessage("Subtotal is required")
        .isFloat({ min: 0 }),

    // validating the taxTotal field
    body("taxTotal")
        .optional()
        .isFloat({ min: 0 }),

    // validating the grandTotal field
    body("grandTotal")
        .notEmpty()
        .withMessage("Grand total is required")
        .isFloat({ min: 0 }),

    // validating the status field
    body("status")
        .optional()
        .isIn(["draft", "sent", "accepted", "rejected", "expired"])
        .withMessage("Invalid status"),

    // validating errors
    validateErrors

];

const approveQuotationValidators = [

    // validating the quotationId param
    param("quotationId")
        .notEmpty()
        .withMessage("Quotation ID is required")
        .custom((value) => mongoose.Types.ObjectId.isValid(value))
        .withMessage("Invalid Quotation ID"),

    // validating errors
    validateErrors

];

export { createQuotationValidators, approveQuotationValidators };
