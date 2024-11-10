import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ActivityBtn from '../components/ActivityBtn';
import DestinationBtn from '../components/DestinationBtn';
import './TripDetails.css';

// Component to display the details of a specific trip
const TripDetails = ({ data }) => {
  // Extract the `id` parameter from the URL using React Router
  const { id } = useParams();

  // State to store the details of the current trip
  const [post, setPost] = useState({
    id: 0,
    title: "",
    description: "",
    img_url: "",
    num_days: 0,
    start_date: "",
    end_date: "",
    total_cost: 0.0,
  });

  // State to store the activities associated with the trip
  const [activities, setActivities] = useState([]);

  // State to store the destinations associated with the trip
  const [destinations, setDestinations] = useState([]);

  // Fetch trip details, activities, and destinations when the component mounts
  useEffect(() => {
    // Find the trip that matches the `id` from the URL
    const result = data.filter(item => item.id === parseInt(id))[0];
    
    // Set the state with the details of the found trip
    setPost({
      id: parseInt(result.id),
      title: result.title,
      description: result.description,
      img_url: result.img_url,
      num_days: parseInt(result.num_days),
      start_date: result.start_date.slice(0, 10), // Format date to YYYY-MM-DD
      end_date: result.end_date.slice(0, 10),     // Format date to YYYY-MM-DD
      total_cost: result.total_cost,
    });

    // Fetch activities associated with the trip
    const fetchActivities = async () => {
      const response = await fetch('/api/activities/' + id);
      const data = await response.json();
      setActivities(data);
    };

    // Fetch destinations associated with the trip
    const fetchDestinations = async () => {
      const response = await fetch('/api/trips-destinations/destinations/' + id);
      const data = await response.json();
      setDestinations(data);
    };

    // Call the fetch functions
    fetchActivities();
    fetchDestinations();
  }, [data, id]);

  return (
    <div className="out">
      {/* Flex container to display trip details */}
      <div className="flex-container">
        {/* Left side showing trip information */}
        <div className="left-side">
          <h3>{post.title}</h3>
          <p>{"🗓️ Duration: " + post.num_days + " days"}</p>
          <p>{"🛫 Depart: " + post.start_date}</p>
          <p>{"🛬 Return: " + post.end_date}</p>
          <p>{post.description}</p>
        </div>

        {/* Right side displaying trip image */}
        <div className="right-side" style={{ backgroundImage: `url(${post.img_url})` }}>
        </div>
      </div>

      {/* Flex container for activities and destinations */}
      <div className="flex-container">
        {/* Section for displaying activities */}
        <div className="activities">
          {/* Map through the activities and render each using ActivityBtn component */}
          {activities && activities.length > 0
            ? activities.map((activity, index) => (
                <ActivityBtn
                  key={index}
                  id={activity.id}
                  activity={activity.activity}
                  num_votes={activity.num_votes}
                />
              ))
            : ''
          }
          <br />
          {/* Button to add a new activity to the trip */}
          <Link to={'../../activity/create/' + id}>
            <button className="addActivityBtn">+ Add Activity</button>
          </Link>
        </div>

        {/* Section for displaying destinations */}
        <div className="destinations">
          {/* Map through the destinations and render each using DestinationBtn component */}
          {destinations && destinations.length > 0
            ? destinations.map((destination, index) => (
                <DestinationBtn key={index} id={destination.id} destination={destination.destination} />
              ))
            : ''
          }
          <br />
          {/* Button to add a new destination to the trip */}
          <Link to={'../../destination/new/' + id}>
            <button className="addDestinationBtn">+ Add Destination</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
