# Duevora Application Docker Configuration

This project is configured with a fully containerized Docker workflow for both **Development** and **Production** environments, using an external MongoDB instance (e.g. MongoDB Atlas) via the `MONGO_URI` environment variable.

---

## 🛠️ Development Environment

The development environment runs the client (Vite + React) and the server (Node + Express) in separate, hot-reloading containers.

### Features
* **Zero-Rebuild Code Updates**: The project directories are bind-mounted into the containers. Any edits you make on your local system will immediately update in the container.
* **Automatic `node_modules` Sync**: If you modify `package.json` (e.g. add/update/remove a dependency), a lightweight watcher script inside the container (`watch-package.js`) will detect the change, temporarily stop the app, run `npm install` inside the container, and restart the app. **You do not need to rebuild the containers when dependencies change!**
* **Vite HMR on Windows**: Vite is configured with polling enabled, ensuring HMR works perfectly even when coding on a Windows host.

### How to Run (Development)

1. Make sure you have **Docker** and **Docker Compose** installed.
2. Add your Atlas connection string to the `.env` file inside the `server` directory (`server/.env`):
   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/duevora
   ```
3. Start the development environment:
   ```bash
   docker compose up
   ```
4. Open your browser:
   * **Frontend (Vite Dev Server)**: [http://localhost:5173](http://localhost:5173)
   * **Backend API Server**: [http://localhost:3000](http://localhost:3000)

### Stopping the Dev Server
Press `Ctrl + C` or run:
```bash
docker compose down
```

---

## 🚀 Production Environment

In production, the app is packaged into a **single, highly-optimized container** where the Express backend serves the pre-built React frontend assets from the backend's `public/` directory.

### Features
* **Multi-stage Build**: A build stage compiles the frontend into static assets (`dist` directory). A final production stage copies these assets to the server's `public/` directory and exposes the Express app.
* **Minimal Footprint**: Uses `node:20-alpine` and only installs production dependencies (`--only=production`) in the final image.
* **Production Static Serving**: The backend automatically serves the static assets and routes client-side routing fallback endpoints to React's `index.html`.

### How to Run (Production)

1. Start the production container (make sure your database connection is defined in `server/.env`):
   ```bash
   docker compose -f docker-compose.prod.yml up --build
   ```

2. Open the application:
   * Both frontend and backend are unified on port 3000: [http://localhost:3000](http://localhost:3000)

To build and run the standalone production image directly without compose:
```bash
# Build the image
docker build -t duevora-prod .

# Run the image, passing the Atlas connection string
docker run -p 3000:3000 -e MONGO_URI="mongodb+srv://<username>:<password>@cluster.mongodb.net/duevora" duevora-prod
```

---

## 📁 Architecture and Ports Summary

* **Frontend Container (Dev)**:
  * Port: `5173` (mapped from inside Vite `0.0.0.0:5173`)
  * Command: Runs `watch-package.js npm run dev -- --host`
  * Proxy: Configured to forward all `/api` requests to backend at `http://server:3000`

* **Backend Container (Dev & Prod)**:
  * Port: `3000` (mapped from Express server)
  * Dev Command: Runs `watch-package.js npm run dev` (starts Nodemon)
  * Prod Command: Runs `node server.js`
  * Database: Connects to external MongoDB (MongoDB Atlas) specified by `MONGO_URI`

