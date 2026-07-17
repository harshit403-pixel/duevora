// Importing modules
import express from "express";
import AuditLogsController from "./auditLogs.controller.js";
import authMiddleware from "../../../shared/middlewares/auth.middleware.js";
import permissionMiddleware from "../../../shared/middlewares/permission.middleware.js";

// making the router
const router = express.Router();

// creating a auditLogs controller instance
const controller = new AuditLogsController();

/*
    @route GET /api/auditLogs
    @desc List audit logs with pagination and optional entity type filter
    @access Private (requires auditLogs.view permission)
*/
router.get("/", authMiddleware, permissionMiddleware("auditLogs.view"), controller.listAuditLogs);

// exporting the router
export default router;
