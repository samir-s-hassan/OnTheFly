// controllers/destinations.js
import { pool } from "../config/database.js";

// Insert a new destination
const createDestination = async (req, res) => {
  try {
    const { destination, description, city, country, img_url, flag_img_url } = req.body;

    const results = await pool.query(
      "INSERT INTO destinations (destination, description, city, country, img_url, flag_img_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [destination, description, city, country, img_url, flag_img_url]
    );

    res.status(201).json(results.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve all destinations
const getDestinations = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM destinations ORDER BY id ASC");
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve a single destination
const getDestination = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await pool.query("SELECT * FROM destinations WHERE id = $1", [id]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update details for a single destination
const updateDestination = async (req, res) => {
  try {
    const { id } = req.params;
    const { destination, description, city, country, img_url, flag_img_url } = req.body;

    const results = await pool.query(
      "UPDATE destinations SET destination = $1, description = $2, city = $3, country = $4, img_url = $5, flag_img_url = $6 WHERE id = $7 RETURNING *",
      [destination, description, city, country, img_url, flag_img_url, id]
    );

    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a single destination
const deleteDestination = async (req, res) => {
  try {
    const { id } = req.params;

    const results = await pool.query("DELETE FROM destinations WHERE id = $1 RETURNING *", [id]);

    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  createDestination,
  getDestinations,
  getDestination,
  updateDestination,
  deleteDestination,
};
