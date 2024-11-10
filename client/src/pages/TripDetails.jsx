import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ActivityBtn from "../components/ActivityBtn";
import DestinationBtn from "../components/DestinationBtn";
import "./TripDetails.css";

const TripDetails = ({ data }) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [activities, setActivities] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the trip details from the data
  useEffect(() => {
    if (data && data.length > 0) {
      const result = data.find((item) => item.id === parseInt(id));
      if (result) {
        setPost({
          id: result.id,
          title: result.title,
          description: result.description,
          img_url: result.img_url,
          num_days: result.num_days,
          start_date: result.start_date.slice(0, 10),
          end_date: result.end_date.slice(0, 10),
          total_cost: result.total_cost,
        });
      } else {
        console.error("Trip not found with ID:", id);
      }
      setLoading(false);
    }
  }, [data, id]);

  // Fetch activities and destinations
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch("/api/activities/" + id);
        const activitiesData = await response.json();
        setActivities(activitiesData);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    const fetchDestinations = async () => {
      try {
        const response = await fetch("/api/trips-destinations/destinations/" + id);
        const destinationsData = await response.json();
        setDestinations(destinationsData);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };

    fetchActivities();
    fetchDestinations();
  }, [id]);

  // Show loading message if data is not yet loaded
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Trip not found</div>;
  }

  return (
    <div className="out">
      <div className="flex-container">
        <div className="left-side">
          <h3>{post.title}</h3>
          <p>{"🗓️ Duration: " + post.num_days + " days"}</p>
          <p>{"🛫 Depart: " + post.start_date}</p>
          <p>{"🛬 Return: " + post.end_date}</p>
          <p>{post.description}</p>
        </div>
        <div className="right-side" style={{ backgroundImage: `url(${post.img_url})` }}></div>
      </div>

      {/* Activities Section */}
      <div className="flex-container">
        <div className="activities">
          {activities.length > 0 ? (
            activities.map((activity, index) => (
              <ActivityBtn
                key={index}
                id={activity.id}
                activity={activity.activity}
                num_votes={activity.num_votes}
              />
            ))
          ) : (
            <p>No activities found</p>
          )}
          {/* Add Activity button right below the activities */}
          <div className="add-activity-container">
            <Link to={`../../activity/create/${id}`}>
              <button className="addActivityBtn">+ Add Activity</button>
            </Link>
          </div>
        </div>

        {/* Destinations Section */}
        <div className="destinations">
          {destinations.length > 0 ? (
            destinations.map((destination, index) => (
              <DestinationBtn
                key={index}
                id={destination.id}
                destination={destination.destination}
              />
            ))
          ) : (
            <p>No destinations found</p>
          )}
          <Link to={`../../destination/new/${id}`}>
            <button className="addDestinationBtn">+ Add Destination</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
