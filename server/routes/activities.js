import express from "express"; // Importing the Express framework
import ActivitiesController from "../controllers/activities.js"; // Importing the ActivitiesController with all activity-related logic

const router = express.Router(); // Creating a router instance for defining routes

// Route to get all activities, handled by the getActivities function in the ActivitiesController
router.get("/", ActivitiesController.getActivities);

// Route to get all activities associated with a specific trip, handled by the getTripActivities function in the ActivitiesController
router.get("/:trip_id", ActivitiesController.getTripActivities);

// Route to create a new activity for a specific trip, handled by the createActivity function in the ActivitiesController
router.post("/:trip_id", ActivitiesController.createActivity);

// Route to delete a specific activity by ID, handled by the deleteActivity function in the ActivitiesController
router.delete("/:id", ActivitiesController.deleteActivity);

// Route to update the number of likes for a specific activity by ID, handled by the updateActivityLikes function in the ActivitiesController
router.patch("/:id", ActivitiesController.updateActivityLikes);

export default router; // Exporting the router to be used in the main server file
