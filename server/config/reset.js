import { pool } from "./database.js";
import "./dotenv.js";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import fs from "fs";

const currentPath = fileURLToPath(import.meta.url);
const tripsFile = fs.readFileSync(
  path.join(dirname(currentPath), "../config/data/data.json")
);
const tripsData = JSON.parse(tripsFile);

//create the Trips table
const createTripsTable = async () => {
  const createTripsTableQuery = `
        CREATE TABLE IF NOT EXISTS trips (
            id serial PRIMARY KEY,
            title varchar(100) NOT NULL,
            description varchar(500) NOT NULL,
            img_url text NOT NULL,
            num_days integer NOT NULL,
            start_date date NOT NULL,
            end_date date NOT NULL,
            total_cost money NOT NULL
        );
    `;
  try {
    await pool.query(createTripsTableQuery);
    console.log("🎉 trips table created successfully");
  } catch (err) {
    console.error("⚠️ error creating trips table", err);
  }
};

//check if trips table is empty since we'll be adding data to it soon
const isTripsTableEmpty = async () => {
  const query = "SELECT COUNT(*) FROM trips";
  try {
    const res = await pool.query(query);
    return res.rows[0].count === "0"; // returns true if the table is empty
  } catch (err) {
    console.error("⚠️ error checking trips table", err);
    return false;
  }
};

//adding data to the trips table NOTICE: trips table is also being created here
const seedTripsTable = async () => {
  await createTripsTable();
  const isEmpty = await isTripsTableEmpty();

  //only add this new/starter data to the table if it has no data in it
  if (isEmpty) {
    tripsData.forEach((trip) => {
      const insertQuery = {
        text: "INSERT INTO trips (title, description, img_url, num_days, start_date, end_date, total_cost) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      };

      const values = [
        trip.title,
        trip.description,
        trip.img_url,
        trip.num_days,
        trip.start_date,
        trip.end_date,
        trip.total_cost,
      ];

      pool.query(insertQuery, values, (err, res) => {
        if (err) {
          console.error("⚠️ error inserting trip", err);
          return;
        }
        console.log(`✅ ${trip.title} added successfully`);
      });
    });
  } else {
    console.log("🚫 trips table already has data. Skipping seeding.");
  }
};

//create the Destinations table
const createDestinationsTable = async () => {
  const createDestinationsTableQuery = `
        CREATE TABLE IF NOT EXISTS destinations (
            id serial PRIMARY KEY,
            destination varchar(100) NOT NULL,
            description varchar(500) NOT NULL,
            city varchar(100) NOT NULL,
            country varchar(100) NOT NULL,
            img_url text NOT NULL,
            flag_img_url text NOT NULL
        );
    `;
  try {
    await pool.query(createDestinationsTableQuery);
    console.log("🎉 destinations table created successfully");
  } catch (err) {
    console.error("⚠️ error creating destinations table", err);
  }
};

//create the Activities table
const createActivitiesTable = async () => {
  const createActivitiesTableQuery = `
        CREATE TABLE IF NOT EXISTS activities (
            id serial PRIMARY KEY,
            trip_id int NOT NULL,
            activity varchar(100) NOT NULL,
            num_votes integer DEFAULT 0,
            FOREIGN KEY(trip_id) REFERENCES trips(id)
        );
    `;
  try {
    await pool.query(createActivitiesTableQuery);
    console.log("🎉 activities table created successfully");
  } catch (err) {
    console.error("⚠️ error creating activities table", err);
  }
};

//create the Trips Destinations table
const createTripsDestinationsTable = async () => {
  const createTripsDestinationsTableQuery = `
        CREATE TABLE IF NOT EXISTS trips_destinations (
            trip_id int NOT NULL,
            destination_id int NOT NULL,
            PRIMARY KEY (trip_id, destination_id),
            FOREIGN KEY (trip_id) REFERENCES trips(id) ON UPDATE CASCADE,
            FOREIGN KEY (destination_id) REFERENCES destinations(id) ON UPDATE CASCADE
        );
    `;
  try {
    await pool.query(createTripsDestinationsTableQuery);
    console.log("🎉 trips_destinations table created successfully");
  } catch (err) {
    console.error("⚠️ error creating trips_destinations table", err);
  }
};

//create the Users table
const createUsersTable = async () => {
  const createUsersTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id serial PRIMARY KEY,
            githubid integer NOT NULL,
            username varchar(100) NOT NULL,
            avatarurl varchar(500) NOT NULL,
            accesstoken varchar(500) NOT NULL
        );
    `;
  try {
    const res = await pool.query(createUsersTableQuery);
    console.log("🎉 users table created successfully");
  } catch (error) {
    console.error("⚠️ error creating users table", err);
  }
};

//create the Trips Users table
const createTripsUsersTable = async () => {
  const createTripsUsersTableQuery = `
        CREATE TABLE IF NOT EXISTS trips_users (
            trip_id int NOT NULL,
            user_id int NOT NULL,
            PRIMARY KEY (trip_id, user_id),
            FOREIGN KEY (trip_id) REFERENCES trips(id) ON UPDATE CASCADE,
            FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE
        );
    `;
  try {
    const res = await pool.query(createTripsUsersTableQuery);
    console.log("🎉 trips_users table created successfully");
  } catch (error) {
    console.error("⚠️ error creating trips_users table", err);
  }
};

//setup the database using awaits as we'll go in the correct order here
const setupDatabase = async () => {
  await seedTripsTable();
  await createDestinationsTable();
  await createActivitiesTable();
  await createTripsDestinationsTable();
  await createUsersTable();
  await createTripsUsersTable();
};

setupDatabase();
