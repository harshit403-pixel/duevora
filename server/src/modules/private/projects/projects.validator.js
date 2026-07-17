// Importing modules
import { body } from "express-validator";
import validateErrors from "../../../shared/utils/validateErrors.util.js";

const createProjectValidators = [

    // validating the name field
    body("name")
        .notEmpty()
        .withMessage("Project name is required")
        .isString(),

    // validating the code field
    body("code")
        .notEmpty()
        .withMessage("Project code is required")
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage("Code must be alphanumeric or contain underscores"),

    // validating the customerId field
    body("customerId")
        .optional(),

    // validating the status field
    body("status")
        .optional()
        .isIn(["active", "inactive"])
        .withMessage("Invalid status"),

    // validating errors
    validateErrors

];

export { createProjectValidators };
