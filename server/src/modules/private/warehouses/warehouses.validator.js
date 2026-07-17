// Importing modules
import { body } from "express-validator";
import validateErrors from "../../../shared/utils/validateErrors.util.js";

const createWarehouseValidators = [

    // validating the name field
    body("name")
        .notEmpty()
        .withMessage("Warehouse name is required")
        .isString()
        .withMessage("Warehouse name must be a string"),

    // validating the code field
    body("code")
        .notEmpty()
        .withMessage("Warehouse code is required")
        .isString()
        .withMessage("Warehouse code must be a string"),

    // validating the address field
    body("address")
        .optional()
        .isString(),

    // validating the status field
    body("status")
        .optional()
        .isIn(["active", "inactive"])
        .withMessage("Status must be either active or inactive"),

    // validating errors
    validateErrors

];

export { createWarehouseValidators };
