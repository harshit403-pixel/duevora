// Importing modules
import createApp from "./src/app.js";

const PORT = process.env.PORT || 3000;

// function to start the server
function startServer() {

    // making the app
    const app = createApp();

    // starting the server
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

}

// starting the server
startServer();
