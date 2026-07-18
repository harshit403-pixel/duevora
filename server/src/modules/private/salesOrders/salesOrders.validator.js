// Importing modules
import { body, param } from "express-validator";
import validateErrors from "../../../shared/utils/validateErrors.util.js";
import mongoose from "mongoose";

const createSalesOrderValidators = [

    // validating the customerId field
    body("customerId")
        .notEmpty()
        .withMessage("Customer is required")
        .custom((v) => mongoose.Types.ObjectId.isValid(v))
        .withMessage("Invalid Customer ID"),

    // validating the orderNumber field
    body("orderNumber")
        .notEmpty()
        .withMessage("Order number is required")
        .isString(),

    // validating the orderDate field
    body("orderDate")
        .notEmpty()
        .withMessage("Order date is required")
        .isISO8601()
        .withMessage("Must be a valid date"),

    // validating the grandTotal field
    body("grandTotal")
        .notEmpty()
        .withMessage("Grand total is required")
        .isFloat({ min: 0 }),

    // validating the status field
    body("status")
        .optional()
        .isIn(["draft", "pending", "processing", "shipped", "delivered", "cancelled"])
        .withMessage("Invalid status"),

    // validating errors
    validateErrors

];

const approveSalesOrderValidators = [

    // validating the orderId param
    param("orderId")
        .notEmpty()
        .withMessage("Order ID is required")
        .custom((value) => mongoose.Types.ObjectId.isValid(value))
        .withMessage("Invalid Order ID"),

    // validating errors
    validateErrors

];

export { createSalesOrderValidators, approveSalesOrderValidators };
