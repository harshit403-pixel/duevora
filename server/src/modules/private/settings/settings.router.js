// Importing modules
import express from "express";
import SettingsController from "./settings.controller.js";
import { upsertSettingValidators } from "./settings.validator.js";
import authMiddleware from "../../../shared/middlewares/auth.middleware.js";
import permissionMiddleware from "../../../shared/middlewares/permission.middleware.js";

// making the router
const router = express.Router();

// creating a Settings controller instance
const controller = new SettingsController();

/*
    @route PUT /api/settings
    @desc Upsert a setting key-value pair for the current organization
    @access Private (requires settings.update permission)
*/
router.put("/", authMiddleware, permissionMiddleware("settings.update"), upsertSettingValidators, controller.upsertSetting);

// exporting the router
export default router;
