// Importing modules
import { body } from "express-validator";
import validateErrors from "../../../shared/utils/validateErrors.util.js";
import mongoose from "mongoose";

const createDeliveryChallanValidators = [

    // validating the customerId field
    body("customerId")
        .notEmpty()
        .withMessage("Customer ID is required")
        .custom((value) => mongoose.Types.ObjectId.isValid(value))
        .withMessage("Invalid Customer ID"),

    // validating the challanNumber field
    body("challanNumber")
        .notEmpty()
        .withMessage("Challan number is required")
        .isString(),

    // validating the challanDate field
    body("challanDate")
        .notEmpty()
        .withMessage("Challan date is required")
        .isISO8601()
        .withMessage("Challan date must be a valid ISO 8601 date"),

    // validating the status field
    body("status")
        .optional()
        .isIn(["draft", "dispatched", "delivered", "cancelled"])
        .withMessage("Invalid status"),

    // validating errors
    validateErrors

];

export { createDeliveryChallanValidators };
