// Importing modules
import { body } from "express-validator";
import validateErrors from "../../../shared/utils/validateErrors.util.js";

const onboardValidators = [

    // validating the name field
    body("name")
        .notEmpty()
        .withMessage("Organization name is required")
        .isLength({ min: 2 })
        .withMessage("Organization name must be at least 2 characters long"),

    // validating the code field
    body("code")
        .notEmpty()
        .withMessage("Organization code is required")
        .isLength({ min: 2 })
        .withMessage("Organization code must be at least 2 characters long")
        .isAlphanumeric()
        .withMessage("Organization code must be alphanumeric"),

    // validating the firstName field
    body("firstName")
        .notEmpty()
        .withMessage("First name is required"),

    // validating the lastName field
    body("lastName")
        .notEmpty()
        .withMessage("Last name is required"),

    // validating errors
    validateErrors

];

export { onboardValidators };
