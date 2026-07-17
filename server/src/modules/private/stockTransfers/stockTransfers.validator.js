// Importing modules
import { body, param } from "express-validator";
import validateErrors from "../../../shared/utils/validateErrors.util.js";
import mongoose from "mongoose";

const createStockTransferValidators = [

    // validating the fromWarehouseId field
    body("fromWarehouseId")
        .notEmpty()
        .withMessage("Source warehouse is required")
        .custom((v) => mongoose.Types.ObjectId.isValid(v))
        .withMessage("Invalid Source Warehouse ID"),

    // validating the toWarehouseId field
    body("toWarehouseId")
        .notEmpty()
        .withMessage("Destination warehouse is required")
        .custom((v) => mongoose.Types.ObjectId.isValid(v))
        .withMessage("Invalid Destination Warehouse ID"),

    // validating the productId field
    body("productId")
        .notEmpty()
        .withMessage("Product is required")
        .custom((v) => mongoose.Types.ObjectId.isValid(v))
        .withMessage("Invalid Product ID"),

    // validating the quantity field
    body("quantity")
        .notEmpty()
        .withMessage("Quantity is required")
        .isInt({ min: 1 })
        .withMessage("Quantity must be at least 1"),

    // validating the transferDate field
    body("transferDate")
        .optional()
        .isISO8601()
        .withMessage("Must be a valid date"),

    // validating errors
    validateErrors

];

const approveStockTransferValidators = [

    // validating the transferId param
    param("transferId")
        .notEmpty()
        .withMessage("Transfer ID is required")
        .custom((value) => mongoose.Types.ObjectId.isValid(value))
        .withMessage("Invalid Transfer ID"),

    // validating errors
    validateErrors

];

export { createStockTransferValidators, approveStockTransferValidators };
