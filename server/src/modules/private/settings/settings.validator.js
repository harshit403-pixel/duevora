// Importing modules
import { body } from "express-validator";
import validateErrors from "../../../shared/utils/validateErrors.util.js";

const upsertSettingValidators = [

    // validating the key field
    body("key")
        .notEmpty()
        .withMessage("Setting key is required")
        .isString(),

    // validating the value field
    body("value")
        .notEmpty()
        .withMessage("Setting value is required")
        .isString(),

    // validating errors
    validateErrors

];

export { upsertSettingValidators };
