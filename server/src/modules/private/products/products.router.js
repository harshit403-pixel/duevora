// Importing modules
import express from "express";
import ProductsController from "./products.controller.js";
import { createProductValidators, listProductsValidators } from "./products.validator.js";
import authMiddleware from "../../../shared/middlewares/auth.middleware.js";
import permissionMiddleware from "../../../shared/middlewares/permission.middleware.js";

const router = express.Router();
const controller = new ProductsController();

/*
    @route POST /api/products
    @desc Create a new product in the current organization
    @access Private (requires products.create permission)
*/
router.post("/", authMiddleware, permissionMiddleware("products.create"), createProductValidators, controller.createProduct);

/*
    @route GET /api/products
    @desc List product profiles with pagination and search
    @access Private (requires products.view permission)
*/
router.get("/", authMiddleware, permissionMiddleware("products.view"), listProductsValidators, controller.listProducts);

export default router;
