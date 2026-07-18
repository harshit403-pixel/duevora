// Importing modules
import { body } from "express-validator";
import validateErrors from "../../../shared/utils/validateErrors.util.js";
import mongoose from "mongoose";

const createBudgetValidators = [

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

    // validating the amount field
    body("amount")
        .notEmpty()
        .withMessage("Budget amount is required")
        .isFloat({ min: 0 })
        .withMessage("Amount cannot be negative"),

    // validating errors
    validateErrors

];

export { createBudgetValidators };
