// Importing modules
import { body, query, param } from "express-validator";
import validateErrors from "../../../shared/utils/validateErrors.util.js";
import mongoose from "mongoose";

const createProductValidators = [

    // validating the name field
    body("name")
        .notEmpty()
        .withMessage("Product name is required")
        .isLength({ min: 2 })
        .withMessage("Product name must be at least 2 characters long"),

    // validating the sku field
    body("sku")
        .notEmpty()
        .withMessage("SKU is required")
        .isString()
        .withMessage("SKU must be a string"),

    // validating the description field
    body("description")
        .optional()
        .isString(),

    // validating the categoryId field
    body("categoryId")
        .optional()
        .custom((value) => mongoose.Types.ObjectId.isValid(value))
        .withMessage("Invalid Category ID"),

    // validating the unitId field
    body("unitId")
        .optional()
        .custom((value) => mongoose.Types.ObjectId.isValid(value))
        .withMessage("Invalid Unit ID"),

    // validating the price field
    body("price")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Price must be a non-negative number"),

    // validating the cost field
    body("cost")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Cost must be a non-negative number"),

    // validating the status field
    body("status")
        .optional()
        .isIn(["active", "inactive"])
        .withMessage("Status must be either active or inactive"),

    // validating errors
    validateErrors

];

const listProductsValidators = [

    // validating the page query param
    query("page")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Page must be a positive integer"),

    // validating the limit query param
    query("limit")
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage("Limit must be an integer between 1 and 100"),

    // validating the sortBy query param
    query("sortBy")
        .optional()
        .isString()
        .withMessage("sortBy must be a string"),

    // validating the sortOrder query param
    query("sortOrder")
        .optional()
        .isIn(["asc", "desc"])
        .withMessage("Sort order must be asc or desc"),

    // validating the search query param
    query("search")
        .optional()
        .isString()
        .withMessage("Search term must be a string"),

    // validating errors
    validateErrors

];

const getProductValidators = [

    // validating the productId param
    param("productId")
        .notEmpty()
        .withMessage("Product ID is required")
        .custom((value) => mongoose.Types.ObjectId.isValid(value))
        .withMessage("Invalid Product ID"),

    // validating errors
    validateErrors

];

const updateProductValidators = [

    // validating the productId param
    param("productId")
        .notEmpty()
        .withMessage("Product ID is required")
        .custom((value) => mongoose.Types.ObjectId.isValid(value))
        .withMessage("Invalid Product ID"),

    // validating the name field
    body("name")
        .optional()
        .isLength({ min: 2 })
        .withMessage("Product name must be at least 2 characters long"),

    // validating the sku field
    body("sku")
        .optional()
        .isString()
        .withMessage("SKU must be a string"),

    // validating the description field
    body("description")
        .optional()
        .isString(),

    // validating the categoryId field
    body("categoryId")
        .optional()
        .custom((value) => mongoose.Types.ObjectId.isValid(value))
        .withMessage("Invalid Category ID"),

    // validating the unitId field
    body("unitId")
        .optional()
        .custom((value) => mongoose.Types.ObjectId.isValid(value))
        .withMessage("Invalid Unit ID"),

    // validating the price field
    body("price")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Price must be a non-negative number"),

    // validating the cost field
    body("cost")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Cost must be a non-negative number"),

    // validating the status field
    body("status")
        .optional()
        .isIn(["active", "inactive"])
        .withMessage("Status must be either active or inactive"),

    // validating errors
    validateErrors

];

const bulkImportProductsValidators = [

    // validating the products field
    body("products")
        .isArray({ min: 1 })
        .withMessage("Products must be a non-empty array"),

    // validating the name field inside array
    body("products.*.name")
        .notEmpty()
        .withMessage("Product name is required")
        .isLength({ min: 2 })
        .withMessage("Product name must be at least 2 characters long"),

    // validating the sku field inside array
    body("products.*.sku")
        .notEmpty()
        .withMessage("SKU is required")
        .isString(),

    // validating the description field inside array
    body("products.*.description")
        .optional()
        .isString(),

    // validating the categoryId field inside array
    body("products.*.categoryId")
        .optional()
        .custom((value) => mongoose.Types.ObjectId.isValid(value))
        .withMessage("Invalid Category ID"),

    // validating the unitId field inside array
    body("products.*.unitId")
        .optional()
        .custom((value) => mongoose.Types.ObjectId.isValid(value))
        .withMessage("Invalid Unit ID"),

    // validating the price field inside array
    body("products.*.price")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Price must be a non-negative number"),

    // validating the cost field inside array
    body("products.*.cost")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Cost must be a non-negative number"),

    // validating errors
    validateErrors

];

export {
    createProductValidators,
    listProductsValidators,
    getProductValidators,
    updateProductValidators,
    bulkImportProductsValidators
};
