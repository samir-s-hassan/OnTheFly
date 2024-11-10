import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './CreateActivity.css';

// Component to create a new activity for a specific trip
const CreateActivity = () => {
  // State to store the activity input
  const [activity, setActivity] = useState({ activity: "" });

  // Extract the `trip_id` from the URL parameters using React Router
  const { trip_id } = useParams();

  // Function to handle changes in the form input
  const handleChange = (event) => {
    const { name, value } = event.target;
    // Update the activity state with the new input value
    setActivity((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // Function to handle the creation of a new activity
  const createActivity = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior (page reload)

    // Set up the POST request options to create a new activity
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Convert the activity state to a JSON string in the request body
      body: JSON.stringify(activity),
    };

    // Make a POST request to create the activity for the specified trip
    fetch('/api/activities/' + trip_id, options);

    // Redirect the user to the homepage after creating the activity
    window.location.href = '/';
  };

  return (
    <div>
      {/* Centered heading for the form */}
      <center>
        <h3>Add Activity</h3>
      </center>

      {/* Form to input activity details */}
      <form>
        {/* Input field for activity name */}
        <label>Activity</label> <br />
        <input
          type="text"
          id="activity"
          name="activity"
          value={activity.activity}
          onChange={handleChange}
        />
        <br />
        <br />

        {/* Display the Trip ID (read-only) */}
        <label>Trip ID</label>
        <br />
        <input
          type="number"
          id="trip_id"
          name="trip_id"
          value={trip_id}
          readOnly
        />
        <br />
        <br />

        {/* Submit button to create the activity */}
        <input type="submit" value="Submit" onClick={createActivity} />
      </form>
    </div>
  );
};

export default CreateActivity;
