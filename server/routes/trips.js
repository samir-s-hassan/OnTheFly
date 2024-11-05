import express from "express"; // Importing the Express framework
import TripsController from "../controllers/trips.js"; // Importing the TripsController with all trip-related logic

const router = express.Router(); // Creating a router instance for defining routes

// Route to get all trips, handled by the getTrips function in the TripsController
router.get("/", TripsController.getTrips);

// Route to get a specific trip by ID, handled by the getTrip function in the TripsController
router.get("/:id", TripsController.getTrip);

// Route to create a new trip, handled by the createTrip function in the TripsController
router.post("/", TripsController.createTrip);

// Route to delete a specific trip by ID, handled by the deleteTrip function in the TripsController
router.delete("/:id", TripsController.deleteTrip);

// Route to update a specific trip by ID, handled by the updateTrip function in the TripsController
router.patch("/:id", TripsController.updateTrip);

export default router; // Exporting the router to be used in the main server file
