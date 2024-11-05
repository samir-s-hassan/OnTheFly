import { pool } from "./database.js";

// Controller function to create a new trip
const createTrip = async (req, res) => {
  try {
    // Destructure trip details from request body
    const {
      title,
      description,
      img_url,
      num_days,
      start_date,
      end_date,
      total_cost,
    } = req.body;

    // Insert trip data into the 'trips' table and return the newly created trip
    const results = await pool.query(
      "INSERT INTO trips (title, description, img_url, num_days, start_date, end_date, total_cost) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [title, description, img_url, num_days, start_date, end_date, total_cost]
    );

    // Respond with the created trip details
    res.status(201).json(results.rows[0]);
  } catch (error) {
    // Send a 409 Conflict error if there was an issue
    res.status(409).json({ error: error.message });
  }
};

// Controller function to get all trips
const getTrips = async (req, res) => {
  try {
    // Fetch all trips from the 'trips' table ordered by ID in ascending order
    const results = await pool.query("SELECT * FROM trips ORDER BY id ASC");

    // Respond with the list of trips
    res.status(200).json(results.rows);
  } catch (error) {
    // Send a 409 Conflict error if there was an issue
    res.status(409).json({ error: error.message });
  }
};

// Controller function to get a single trip by ID
const getTrip = async (req, res) => {
  try {
    // Parse the trip ID from request parameters
    const id = parseInt(req.params.id);

    // Fetch the trip from the 'trips' table where the ID matches
    const results = await pool.query("SELECT * FROM trips WHERE id = $1", [id]);

    // Respond with the trip details
    res.status(200).json(results.rows[0]);
  } catch (error) {
    // Log the error and send a 409 Conflict error if there was an issue
    res.status(409).json({ error: error.message });
    console.log("Unable to get trip");
    console.log("Error:", error.message);
  }
};

// Controller function to update an existing trip
const updateTrip = async (req, res) => {
  try {
    // Parse the trip ID from request parameters
    const id = parseInt(req.params.id);

    // Destructure the updated trip details from request body
    const {
      title,
      description,
      img_url,
      num_days,
      start_date,
      end_date,
      total_cost,
    } = req.body;

    // Update the trip in the 'trips' table where the ID matches
    const results = await pool.query(
      "UPDATE trips SET title = $1, description = $2, img_url = $3, num_days = $4, start_date = $5, end_date = $6, total_cost = $7 WHERE id = $8 RETURNING *",
      [
        title,
        description,
        img_url,
        num_days,
        start_date,
        end_date,
        total_cost,
        id,
      ]
    );

    // Respond with the updated trip details
    res.status(200).json(results.rows[0]);
  } catch (error) {
    // Send a 409 Conflict error if there was an issue
    res.status(409).json({ error: error.message });
  }
};

// Controller function to delete a trip and related activities
const deleteTrip = async (req, res) => {
  try {
    // Parse the trip ID from request parameters
    const id = parseInt(req.params.id);

    // Delete all related activities for the trip
    await pool.query("DELETE FROM activities WHERE trip_id = $1", [id]);

    // Delete the trip from the 'trips' table
    const results = await pool.query("DELETE FROM trips WHERE id = $1 RETURNING *", [id]);

    // Respond with the deleted trip details
    res.status(200).json(results.rows[0]);
  } catch (error) {
    // Send a 409 Conflict error if there was an issue
    res.status(409).json({ error: error.message });
  }
};

// Exporting the controller functions to be used in routes
export default {
  createTrip,
  getTrips,
  getTrip,
  updateTrip,
  deleteTrip,
};
