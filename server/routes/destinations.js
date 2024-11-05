import express from "express"; // Importing the Express framework
import DestinationsController from "../controllers/destinations.js"; // Importing the DestinationsController with all destination-related logic

const router = express.Router(); // Creating a router instance for defining routes

// Route to get all destinations, handled by the getDestinations function in the DestinationsController
router.get("/", DestinationsController.getDestinations);

// Route to get a single destination by ID, handled by the getDestination function in the DestinationsController
router.get("/:id", DestinationsController.getDestination);

// Route to create a new destination, handled by the createDestination function in the DestinationsController
router.post("/", DestinationsController.createDestination);

// Route to delete a specific destination by ID, handled by the deleteDestination function in the DestinationsController
router.delete("/:id", DestinationsController.deleteDestination);

// Route to update the details of a specific destination by ID, handled by the updateDestination function in the DestinationsController
router.patch("/:id", DestinationsController.updateDestination);

export default router; // Exporting the router to be used in the main server file
