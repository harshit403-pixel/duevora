// Importing modules
import express from "express";
import AuthController from "./auth.controller.js";
import { signupValidators } from "./auth.validattor.js";

// making the router
const router = express.Router();

// crating a auth controller instance
const authController = new AuthController();

/*
    @route POST /api/auth/signup
    @desc Signup user
    @access Public
*/
router.post("/signup", signupValidators, authController.signup);

// exporting the router
export default router;
