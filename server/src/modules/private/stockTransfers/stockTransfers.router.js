// Importing modules
import express from "express";
import StockTransfersController from "./stockTransfers.controller.js";
import { createStockTransferValidators, approveStockTransferValidators } from "./stockTransfers.validator.js";
import authMiddleware from "../../../shared/middlewares/auth.middleware.js";
import permissionMiddleware from "../../../shared/middlewares/permission.middleware.js";

// making the router
const router = express.Router();

// creating a StockTransfers controller instance
const controller = new StockTransfersController();

/*
    @route POST /api/stock-transfers
    @desc Create a new pending stock transfer
    @access Private (requires stockTransfers.create permission)
*/
router.post("/", authMiddleware, permissionMiddleware("stockTransfers.create"), createStockTransferValidators, controller.createStockTransfer);

/*
    @route POST /api/stock-transfers/:transferId/approve
    @desc Approve a pending stock transfer
    @access Private (requires stockTransfers.update permission)
*/
router.post("/:transferId/approve", authMiddleware, permissionMiddleware("stockTransfers.update"), approveStockTransferValidators, controller.approveStockTransfer);

// exporting the router
export default router;
