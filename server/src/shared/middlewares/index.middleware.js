// Importing modules
import express from "express";
import hpp from "hpp";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import env from "./shared/config/env.config.js";

// function to apply middlewares to the app
function applyMiddlewares(app) {

    // applying middlewares
    app.use(hpp()); // to protect against HTTP Parameter Pollution attacks

    app.use(compression()); // to compress response bodies for all request that traverse through the middleware
    
    app.use(cors()); // to enable CORS (Cross-Origin Resource Sharing) for all routes

    app.use(helmet()); // to secure the app by setting various HTTP headers

    app.use(cookieParser()); // to parse Cookie header and populate req.cookies with an object keyed by the cookie names

    app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev")); // to log HTTP requests and errors

    app.use(express.json({ limit: "100kb" })); // to parse incoming requests with JSON payloads and is based on body-parser

    app.use(express.urlencoded({ extended: true, limit: "100kb" })); // to parse incoming requests with URL-encoded payloads and is based on body-parser

}

export default applyMiddlewares;