// Importing modules
import { body } from "express-validator";
import validateErrors from "../../../shared/utils/validateErrors.util.js";
import mongoose from "mongoose";

const createBankAccountValidators = [

    // validating the bankName field
    body("bankName")
        .notEmpty().withMessage("Bank name is required").isString(),

    // validating the accountNumber field
    body("accountNumber")
        .notEmpty().withMessage("Account number is required").isString(),

    // validating the ifscCode field
    body("ifscCode")
        .optional().isString(),

    // validating the branch field
    body("branch")
        .optional().isString(),

    // validating the accountId field
    body("accountId")
        .notEmpty().withMessage("Account reference is required")
        .custom((v) => mongoose.Types.ObjectId.isValid(v)).withMessage("Invalid Account ID"),

    // validating errors
    validateErrors

];

export { createBankAccountValidators };
