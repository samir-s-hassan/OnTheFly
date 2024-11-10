import "./App.css";
import React, { useState, useEffect } from "react";
import { useRoutes, useLocation, Link } from "react-router-dom";

// Import the loading spinner
import LoadingSpinner from "./components/LoadingSpinner";

// Importing all the necessary pages for routing
import ReadTrips from "./pages/ReadTrips";
import CreateTrip from "./pages/CreateTrip";
import EditTrip from "./pages/EditTrip";
import CreateDestination from "./pages/CreateDestination";
import ReadDestinations from "./pages/ReadDestinations";
import TripDetails from "./pages/TripDetails";
import CreateActivity from "./pages/CreateActivity";
import AddToTrip from "./pages/AddToTrip";

const App = () => {
  const [trips, setTrips] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  // Function to fetch trips data
  const fetchTrips = async () => {
    try {
      const response = await fetch("/api/trips");
      const data = await response.json();
      setTrips(data);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  // Function to fetch destinations data
  const fetchDestinations = async () => {
    try {
      const response = await fetch("/api/destinations");
      const data = await response.json();
      setDestinations(data);
    } catch (error) {
      console.error("Error fetching destinations:", error);
    }
  };

  // Fetch data whenever the route changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchTrips();
      await fetchDestinations();
      setLoading(false);
    };
    fetchData();
  }, [location]);

  const element = useRoutes([
    { path: "/", element: <ReadTrips data={trips} /> },
    { path: "/trip/new", element: <CreateTrip /> },
    { path: "/edit/:id", element: <EditTrip data={trips} /> },
    { path: "/trip/get/:id", element: <TripDetails data={trips} /> },
    { path: "/destinations", element: <ReadDestinations data={destinations} /> },
    { path: "/destination/new/:trip_id", element: <CreateDestination /> },
    { path: "/activity/create/:trip_id", element: <CreateActivity /> },
    { path: "/destinations/add/:destination_id", element: <AddToTrip data={trips} /> },
  ]);

  // Display the loading spinner if the data is still being fetched
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="App">
      <div className="header">
        <h1>On The Fly ✈️</h1>
        <Link to="/">
          <button className="headerBtn">Explore Trips</button>
        </Link>
        <Link to="/destinations">
          <button className="headerBtn">Explore Destinations</button>
        </Link>
        <Link to="/trip/new">
          <button className="headerBtn">+ Add Trip</button>
        </Link>
      </div>
      {element}
    </div>
  );
};

export default App;
