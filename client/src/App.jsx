import "./App.css";
import React, { useState, useEffect } from "react";
import { useRoutes } from "react-router-dom";
import { Link } from "react-router-dom";

// Importing all the necessary pages for routing
import ReadTrips from "./pages/ReadTrips";
import CreateTrip from "./pages/CreateTrip";
import EditTrip from "./pages/EditTrip";
import CreateDestination from "./pages/CreateDestination";
import ReadDestinations from "./pages/ReadDestinations";
import TripDetails from "./pages/TripDetails";
import CreateActivity from "./pages/CreateActivity";
import AddToTrip from "./pages/AddToTrip";

// Main component that serves as the entry point for the application
const App = () => {
  // State to store the list of trips
  const [trips, setTrips] = useState([]);
  // State to store the list of destinations
  const [destinations, setDestinations] = useState([]);

  // Fetch trips and destinations data when the component mounts
  useEffect(() => {
    // Function to fetch trips from the API
    const fetchTrips = async () => {
      const response = await fetch("api/trips"); // Make a GET request to the "/api/trips" endpoint
      const data = await response.json(); // Convert the response to JSON
      setTrips(data); // Update the `trips` state with the fetched data
    };

    // Function to fetch destinations from the API
    const fetchDestinations = async () => {
      const response = await fetch("/api/destinations"); // Make a GET request to the "/api/destinations" endpoint
      const data = await response.json(); // Convert the response to JSON
      setDestinations(data); // Update the `destinations` state with the fetched data
    };

    // Call the fetch functions
    fetchDestinations();
    fetchTrips();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Define all the routes for the application
  let element = useRoutes([
    {
      path: "/",
      element: <ReadTrips data={trips} />, // Route to display all trips
    },
    {
      path: "/trip/new",
      element: <CreateTrip />, // Route to create a new trip
    },
    {
      path: "/edit/:id",
      element: <EditTrip data={trips} />, // Route to edit an existing trip
    },
    {
      path: "/destinations",
      element: <ReadDestinations data={destinations} />, // Route to display all destinations
    },
    {
      path: "/trip/get/:id",
      element: <TripDetails data={trips} />, // Route to display trip details
    },
    {
      path: "/destination/new/:trip_id",
      element: <CreateDestination />, // Route to create a new destination linked to a specific trip
    },
    {
      path: "/activity/create/:trip_id",
      element: <CreateActivity />, // Route to create a new activity for a specific trip
    },
    {
      path: "/destinations/add/:destination_id",
      element: <AddToTrip data={trips} />, // Route to add an existing destination to a trip
    },
  ]);

  return (
    <div className="App">
      {/* Header section with navigation buttons */}
      <div className="header">
        {/* Application title */}
        <h1>On The Fly ✈️</h1>

        {/* Button to navigate to the homepage to explore trips */}
        <Link to="/">
          <button className="headerBtn">Explore Trips</button>
        </Link>

        {/* Button to navigate to the page that displays all destinations */}
        <Link to="/destinations">
          <button className="headerBtn">Explore Destinations</button>
        </Link>

        {/* Button to navigate to the form for adding a new trip */}
        <Link to="/trip/new">
          <button className="headerBtn"> + Add Trip </button>
        </Link>
      </div>

      {/* Render the appropriate component based on the current route */}
      {element}
    </div>
  );
};

export default App;
