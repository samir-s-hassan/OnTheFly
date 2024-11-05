// controllers/trip_destinations.js
import { pool } from "../database.js";

// Insert a new trip destination
const createTripDestination = async (req, res) => {
  try {
    const { trip_id, destination_id } = req.body;

    const results = await pool.query(
      "INSERT INTO trips_destinations (trip_id, destination_id) VALUES ($1, $2) RETURNING *",
      [trip_id, destination_id]
    );

    res.status(201).json(results.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve all trip destinations
const getTripsDestinations = async (req, res) => {
  try {
    const results = await pool.query(
      "SELECT * FROM trips_destinations ORDER BY trip_id ASC"
    );
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve all trips associated with a specific destination
const getAllTrips = async (req, res) => {
  try {
    const { destination_id } = req.params;
    const results = await pool.query(
      "SELECT * FROM trips_destinations WHERE destination_id = $1",
      [destination_id]
    );
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve all destinations associated with a specific trip
const getAllDestinations = async (req, res) => {
  try {
    const { trip_id } = req.params;
    const results = await pool.query(
      "SELECT * FROM trips_destinations WHERE trip_id = $1",
      [trip_id]
    );
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  createTripDestination,
  getTripsDestinations,
  getAllTrips,
  getAllDestinations,
};
