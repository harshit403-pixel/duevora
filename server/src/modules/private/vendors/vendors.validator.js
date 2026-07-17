// Importing modules
import { body, query, param } from "express-validator";
import validateErrors from "../../../shared/utils/validateErrors.util.js";
import mongoose from "mongoose";

const createVendorValidators = [

    // validating the name field
    body("name")
        .notEmpty()
        .withMessage("Vendor name is required")
        .isLength({ min: 2 })
        .withMessage("Vendor name must be at least 2 characters long"),

    // validating the email field
    body("email")
        .optional()
        .isEmail()
        .withMessage("Email is invalid"),

    // validating the phone field
    body("phone")
        .optional()
        .isString(),

    // validating the address field
    body("address")
        .optional()
        .isString(),

    // validating the taxNumber field
    body("taxNumber")
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

const listVendorsValidators = [

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

const getVendorValidators = [

    // validating the vendorId param
    param("vendorId")
        .notEmpty()
        .withMessage("Vendor ID is required")
        .custom((value) => mongoose.Types.ObjectId.isValid(value))
        .withMessage("Invalid Vendor ID"),

    // validating errors
    validateErrors

];

const updateVendorValidators = [

    // validating the vendorId param
    param("vendorId")
        .notEmpty()
        .withMessage("Vendor ID is required")
        .custom((value) => mongoose.Types.ObjectId.isValid(value))
        .withMessage("Invalid Vendor ID"),

    // validating the name field
    body("name")
        .optional()
        .isLength({ min: 2 })
        .withMessage("Vendor name must be at least 2 characters long"),

    // validating the email field
    body("email")
        .optional()
        .isEmail()
        .withMessage("Email is invalid"),

    // validating the phone field
    body("phone")
        .optional()
        .isString(),

    // validating the address field
    body("address")
        .optional()
        .isString(),

    // validating the taxNumber field
    body("taxNumber")
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

const bulkImportVendorsValidators = [

    // validating the vendors array
    body("vendors")
        .isArray({ min: 1 })
        .withMessage("Vendors must be a non-empty array"),

    // validating the name field inside array
    body("vendors.*.name")
        .notEmpty()
        .withMessage("Vendor name is required")
        .isLength({ min: 2 })
        .withMessage("Vendor name must be at least 2 characters long"),

    // validating the email field inside array
    body("vendors.*.email")
        .optional()
        .isEmail()
        .withMessage("Email is invalid"),

    // validating the phone field inside array
    body("vendors.*.phone")
        .optional()
        .isString(),

    // validating the address field inside array
    body("vendors.*.address")
        .optional()
        .isString(),

    // validating the taxNumber field inside array
    body("vendors.*.taxNumber")
        .optional()
        .isString(),

    // validating errors
    validateErrors

];

const bulkUpdateVendorsValidators = [

    // validating the vendorIds array
    body("vendorIds")
        .isArray({ min: 1 })
        .withMessage("vendorIds must be a non-empty array"),

    // validating individual vendorId inside array
    body("vendorIds.*")
        .custom((value) => mongoose.Types.ObjectId.isValid(value))
        .withMessage("Invalid Vendor ID"),

    // validating the updateData object
    body("updateData")
        .notEmpty()
        .withMessage("updateData object is required")
        .isObject()
        .withMessage("updateData must be an object"),

    // validating the status field in updateData
    body("updateData.status")
        .optional()
        .isIn(["active", "inactive"])
        .withMessage("Status must be active or inactive"),

    // validating the address field in updateData
    body("updateData.address")
        .optional()
        .isString(),

    // validating errors
    validateErrors

];

export {
    createVendorValidators,
    listVendorsValidators,
    getVendorValidators,
    updateVendorValidators,
    bulkImportVendorsValidators,
    bulkUpdateVendorsValidators
};
