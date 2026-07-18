// Importing modules
import { body } from "express-validator";
import validateErrors from "../../../shared/utils/validateErrors.util.js";

const createTaxValidators = [

    // validating the name field
    body("name")
        .notEmpty()
        .withMessage("Tax name is required")
        .isString(),

    // validating the rate field
    body("rate")
        .notEmpty()
        .withMessage("Tax rate is required")
        .isFloat({ min: 0 })
        .withMessage("Tax rate cannot be negative"),

    // validating the code field
    body("code")
        .notEmpty()
        .withMessage("Tax code is required")
        .isString(),

    // validating errors
    validateErrors

];

export { createTaxValidators };
