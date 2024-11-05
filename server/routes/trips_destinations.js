import express from "express"; // Importing the Express framework
import TripDestinationsController from "../controllers/trip_destinations.js"; // Importing the TripDestinationsController with all trip-destination-related logic

const router = express.Router(); // Creating a router instance for defining routes

// Route to get all trip-destination relationships, handled by the getTripsDestinations function in the TripDestinationsController
router.get("/", TripDestinationsController.getTripsDestinations);

// Route to get all trips associated with a specific destination ID, handled by the getAllTrips function in the TripDestinationsController
router.get("/trips/:destination_id", TripDestinationsController.getAllTrips);

// Route to get all destinations associated with a specific trip ID, handled by the getAllDestinations function in the TripDestinationsController
router.get("/destinations/:trip_id", TripDestinationsController.getAllDestinations);

// Route to create a new trip-destination relationship, handled by the createTripDestination function in the TripDestinationsController
router.post("/", TripDestinationsController.createTripDestination);

export default router; // Exporting the router to be used in the main server file
