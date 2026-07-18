// Importing modules
import express from "express";
import StockAdjustmentsController from "./stockAdjustments.controller.js";
import {
    createStockAdjustmentValidators,
    approveStockAdjustmentValidators
} from "./stockAdjustments.validator.js";
import authMiddleware from "../../../shared/middlewares/auth.middleware.js";
import permissionMiddleware from "../../../shared/middlewares/permission.middleware.js";

// making the router
const router = express.Router();

// creating a StockAdjustments controller instance
const controller = new StockAdjustmentsController();

/*
    @route POST /api/stock-adjustments
    @desc Create a new stock adjustment in the current organization
    @access Private (requires stockAdjustments.create permission)
*/
router.post("/", authMiddleware, permissionMiddleware("stockAdjustments.create"), createStockAdjustmentValidators, controller.createStockAdjustment);

/*
    @route POST /api/stock-adjustments/:adjustmentId/approve
    @desc Approve a stock adjustment, updating actual inventory and logging stock movement
    @access Private (requires stockAdjustments.update permission)
*/
router.post("/:adjustmentId/approve", authMiddleware, permissionMiddleware("stockAdjustments.update"), approveStockAdjustmentValidators, controller.approveStockAdjustment);

// exporting the router
export default router;
