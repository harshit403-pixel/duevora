// Importing modules
import express from "express";
import router from "./shared/routers/index.router.js";
import applyMiddlewares from "./shared/middlewares/index.middleware.js";

// function to make the app 
function createApp() {

    // create an express app
    const app = express();

    // applying middlewares
    applyMiddlewares(app);

    // adding the index router to the app
    app.use("/api", router);

    // returning the app
    return app;

}

export default createApp;