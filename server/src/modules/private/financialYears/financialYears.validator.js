// Importing modules
import { body } from "express-validator";
import validateErrors from "../../../shared/utils/validateErrors.util.js";

const createFinancialYearValidators = [

    // validating the name field
    body("name")
        .notEmpty()
        .withMessage("Financial year name is required")
        .isString(),

    // validating the startDate field
    body("startDate")
        .notEmpty()
        .withMessage("Start date is required")
        .isISO8601()
        .withMessage("Start date must be a valid ISO 8601 date"),

    // validating the endDate field
    body("endDate")
        .notEmpty()
        .withMessage("End date is required")
        .isISO8601()
        .withMessage("End date must be a valid ISO 8601 date"),

    // validating errors
    validateErrors

];

const archiveFinancialYearValidators = [

    // validating the fyId param
    param("fyId")
        .notEmpty()
        .withMessage("Financial year ID is required")
        .custom((v) => mongoose.Types.ObjectId.isValid(v))
        .withMessage("Invalid financial year ID"),

    // validating errors
    validateErrors

];

export { createFinancialYearValidators, archiveFinancialYearValidators };
