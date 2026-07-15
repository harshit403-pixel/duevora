// Importing modules 
import express from "express";
import authRouter from "../../modules/public/auth/auth.router.js";

// making the router
const router = express.Router();

// mounting the public routers
router.use("/auth", authRouter);

// exporting the router
export default router;