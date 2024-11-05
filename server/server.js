import express from "express"; // Importing the Express framework
import cors from "cors"; // Importing CORS to allow cross-origin requests
import tripRoutes from "./routes/trips.js"; // Importing the routes for trip-related endpoints
import activityRoutes from "./routes/activities.js"; // Importing the routes for activity-related endpoints
import destinationRoutes from "./routes/destinations.js"; // Importing the routes for destination-related endpoints
import tripDestinationRoutes from "./routes/trips_destinations.js"; // Importing the routes for trip-destination-related endpoints

const app = express(); // Initializing the Express app

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cors()); // Middleware to enable CORS, allowing requests from other origins

// Route for handling trip-related requests, mounted at /api/trips
app.use("/api/trips", tripRoutes);

// Route for handling activity-related requests, mounted at /api/activities
app.use("/api/activities", activityRoutes);

// Route for handling destination-related requests, mounted at /api/destinations
app.use("/api/destinations", destinationRoutes);

// Route for handling trip-destination relationships, mounted at /api/trip-destinations
app.use("/api/trip-destinations", tripDestinationRoutes);

const PORT = process.env.PORT || 3001; // Setting the port for the server (defaults to 3001 if PORT is not set in environment variables)

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
