import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./EditTrip.css";

// Component to edit or delete an existing trip
const EditTrip = ({ data }) => {
  // Extract the trip ID from the URL parameters using React Router
  const { id } = useParams();

  // Initialize state to store the trip details
  const [trip, setTrip] = useState({
    id: 0,
    title: "",
    description: "",
    img_url: "",
    num_days: 0,
    start_date: "",
    end_date: "",
    total_cost: 0.0,
  });

  // Fetch the trip details from the passed-in `data` prop based on the trip ID
  useEffect(() => {
    // Find the trip that matches the ID from the URL
    const result = data.filter((item) => item.id === parseInt(id))[0];

    // Set the state with the details of the found trip
    setTrip({
      id: parseInt(result.id),
      title: result.title,
      description: result.description,
      img_url: result.img_url,
      num_days: parseInt(result.num_days),
      start_date: result.start_date.slice(0, 10), // Format date to YYYY-MM-DD
      end_date: result.end_date.slice(0, 10),     // Format date to YYYY-MM-DD
      total_cost: result.total_cost,
    });
  }, [data, id]);

  // Function to handle input changes in the form
  const handleChange = (event) => {
    const { name, value } = event.target;
    // Update the corresponding field in the trip state
    setTrip((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // Function to handle updating the trip details
  const updateTrip = (event) => {
    event.preventDefault(); // Prevent page reload on form submission

    // Setup the PATCH request options to update the trip
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      // Send the updated trip details in the request body
      body: JSON.stringify(trip),
    };

    // Make the PATCH request to update the trip in the database
    fetch("/api/trips/" + id, options);

    // Redirect the user to the homepage after updating the trip
    window.location.href = "/";
  };

  // Function to handle deleting the trip
  const deleteTrip = (event) => {
    event.preventDefault(); // Prevent default behavior

    // Setup the DELETE request options
    const options = {
      method: "DELETE",
    };

    // Make the DELETE request to remove the trip from the database
    fetch("/api/trips/" + id, options);

    // Redirect the user to the homepage after deleting the trip
    window.location.href = "/";
  };

  return (
    <div>
      {/* Form to edit the trip details */}
      <form>
        {/* Input field for trip title */}
        <label>Title</label> <br />
        <input
          type="text"
          id="title"
          name="title"
          value={trip.title}
          onChange={handleChange}
        />
        <br />
        <br />

        {/* Textarea for trip description */}
        <label>Description</label>
        <br />
        <textarea
          rows="5"
          cols="50"
          id="description"
          name="description"
          value={trip.description}
          onChange={handleChange}
        ></textarea>
        <br />

        {/* Input field for image URL */}
        <label>Image URL</label> <br />
        <input
          type="text"
          id="img_url"
          name="img_url"
          value={trip.img_url}
          onChange={handleChange}
        />
        <br />
        <br />

        {/* Input field for the number of days */}
        <label>Number of Days</label> <br />
        <input
          type="number"
          id="num_days"
          name="num_days"
          value={trip.num_days}
          onChange={handleChange}
        />
        <br />
        <br />

        {/* Input field for start date */}
        <label>Start Date</label> <br />
        <input
          type="text"
          id="start_date"
          name="start_date"
          value={trip.start_date}
          onChange={handleChange}
        />
        <br />
        <br />

        {/* Input field for end date */}
        <label>End Date</label> <br />
        <input
          type="text"
          id="end_date"
          name="end_date"
          value={trip.end_date}
          onChange={handleChange}
        />
        <br />
        <br />

        {/* Input field for total cost */}
        <label>Total Cost</label> <br />
        <input
          type="text"
          id="total_cost"
          name="total_cost"
          value={trip.total_cost}
          onChange={handleChange}
        />
        <br />
        <br />

        {/* Submit button to update the trip */}
        <input type="submit" value="Submit" onClick={updateTrip} />

        {/* Button to delete the trip */}
        <button className="deleteButton" onClick={deleteTrip}>
          Delete
        </button>
      </form>
    </div>
  );
};

export default EditTrip;
