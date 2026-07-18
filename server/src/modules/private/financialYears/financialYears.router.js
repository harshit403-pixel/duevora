// Importing modules
import express from "express";
import FinancialYearsController from "./financialYears.controller.js";
import { createFinancialYearValidators, archiveFinancialYearValidators } from "./financialYears.validator.js";
import authMiddleware from "../../../shared/middlewares/auth.middleware.js";
import permissionMiddleware from "../../../shared/middlewares/permission.middleware.js";

// making the router
const router = express.Router();

// creating a financial years controller instance
const controller = new FinancialYearsController();

/*
    @route POST /api/financial-years
    @desc Create a new financial year
    @access Private (requires financialYears.create permission)
*/
router.post("/", authMiddleware, permissionMiddleware("financialYears.create"), createFinancialYearValidators, controller.createFinancialYear);

/*
    @route POST /api/financial-years/:fyId/archive
    @desc Archive an existing financial year
    @access Private (requires financialYears.archive permission)
*/
router.post("/:fyId/archive", authMiddleware, permissionMiddleware("financialYears.archive"), archiveFinancialYearValidators, controller.archiveFinancialYear);

// exporting the router
export default router;
