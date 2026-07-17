// Importing modules
import { param } from "express-validator";
import validateErrors from "../../../shared/utils/validateErrors.util.js";
import mongoose from "mongoose";

const approveSalesOrderValidators = [
    // validating orderId param
    param("orderId")
        .notEmpty()
        .withMessage("Order ID is required")
        .custom((value) => mongoose.Types.ObjectId.isValid(value))
        .withMessage("Invalid Order ID"),

    // validating errors
    validateErrors
];

export { approveSalesOrderValidators };
