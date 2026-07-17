// Importing modules
import { param } from "express-validator";
import validateErrors from "../../../shared/utils/validateErrors.util.js";
import mongoose from "mongoose";

const approveStockTransferValidators = [
    // validating transferId param
    param("transferId")
        .notEmpty()
        .withMessage("Transfer ID is required")
        .custom((value) => mongoose.Types.ObjectId.isValid(value))
        .withMessage("Invalid Transfer ID"),

    // validating errors
    validateErrors
];

export { approveStockTransferValidators };
