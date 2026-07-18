// Importing modules
import { body } from "express-validator";
import validateErrors from "../../../shared/utils/validateErrors.util.js";

const createCostCenterValidators = [

    // validating the name field
    body("name")
        .notEmpty()
        .withMessage("Cost center name is required")
        .isString(),

    // validating the code field
    body("code")
        .notEmpty()
        .withMessage("Cost center code is required")
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage("Code must be alphanumeric or contain underscores"),

    // validating the status field
    body("status")
        .optional()
        .isIn(["active", "inactive"])
        .withMessage("Invalid status"),

    // validating errors
    validateErrors

];

export { createCostCenterValidators };
