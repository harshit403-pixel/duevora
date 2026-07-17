// Importing modules
import { body } from "express-validator";
import validateErrors from "../../../shared/utils/validateErrors.util.js";

const verifyOtpValidators = [

    // validating the otp field
    body("otp")
        .notEmpty()
        .withMessage("OTP is required"),

    // validating errors
    validateErrors

];

export { verifyOtpValidators };
