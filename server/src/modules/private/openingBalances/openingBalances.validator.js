// Importing modules
import { body } from "express-validator";
import validateErrors from "../../../shared/utils/validateErrors.util.js";
import mongoose from "mongoose";

const createOpeningBalanceValidators = [

    // validating the financialYearId field
    body("financialYearId")
        .notEmpty()
        .withMessage("Financial year is required")
        .custom((v) => mongoose.Types.ObjectId.isValid(v))
        .withMessage("Invalid Financial Year ID"),

    // validating the accountId field
    body("accountId")
        .notEmpty()
        .withMessage("Account reference is required")
        .custom((v) => mongoose.Types.ObjectId.isValid(v))
        .withMessage("Invalid Account ID"),

    // validating the debit field
    body("debit")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Debit cannot be negative"),

    // validating the credit field
    body("credit")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Credit cannot be negative"),

    // validating errors
    validateErrors

];

export { createOpeningBalanceValidators };
