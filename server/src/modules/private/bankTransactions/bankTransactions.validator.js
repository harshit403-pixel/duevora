// Importing modules
import { body } from "express-validator";
import validateErrors from "../../../shared/utils/validateErrors.util.js";
import mongoose from "mongoose";

const createBankTransactionValidators = [

    // validating the bankAccountId field
    body("bankAccountId")
        .notEmpty()
        .withMessage("Bank account is required")
        .custom((v) => mongoose.Types.ObjectId.isValid(v))
        .withMessage("Invalid Bank Account ID"),

    // validating the transactionDate field
    body("transactionDate")
        .notEmpty()
        .withMessage("Transaction date is required")
        .isISO8601()
        .withMessage("Transaction date must be a valid ISO 8601 date"),

    // validating the amount field
    body("amount")
        .notEmpty()
        .withMessage("Amount is required")
        .isFloat({ min: 0.01 })
        .withMessage("Amount must be greater than zero"),

    // validating the type field
    body("type")
        .notEmpty()
        .withMessage("Transaction type is required")
        .isIn(["deposit", "withdrawal"])
        .withMessage("Type must be deposit or withdrawal"),

    // validating the reference field
    body("reference")
        .optional()
        .isString(),

    // validating errors
    validateErrors

];

export { createBankTransactionValidators };
