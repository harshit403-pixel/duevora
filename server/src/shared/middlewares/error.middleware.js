// Importing modules
import logger from "../config/logger.config.js";

// function to handle errors in the application
function errorHandler(err, req, res, next) {

    // logging the error to the console
    logger.error(err);

    // sending the error response with the status code and message
    return res.status(err.statusCode || 500).json({

        success: false,
        status: err.statusCode || 500,
        message: err.message || "Internal Server Error",

    });


}

export default errorHandler;
