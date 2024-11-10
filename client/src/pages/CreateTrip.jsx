import React, { useState } from "react";
import "./CreateTrip.css";

// Component to create a new trip
const CreateTrip = () => {
  // State to store the input data for creating a new trip
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

  // Function to handle form submission and create a new trip
  const createTrip = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior (page reload)

    // Set up the POST request options
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Send the `post` data as a JSON object in the request body
      body: JSON.stringify(post),
    };

    try {
      // Make a POST request to the server to create the trip
      const response = await fetch("/api/trips", options);

      // If the response is successful, redirect to the homepage
      if (response.ok) {
        window.location.href = "/";
      } else {
        console.error("Failed to create trip"); // Log an error if the request fails
      }
    } catch (error) {
      console.error("Error:", error); // Catch any errors and log them
    }
  };

  // Function to handle changes in form inputs
  const handleChange = (event) => {
    const { name, value } = event.target;
    // Update the corresponding field in the `post` state
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      {/* Centered heading for the form */}
      <center>
        <h3>Create New Trip</h3>
      </center>

      {/* Form to input trip details */}
      <form onSubmit={createTrip}>
        {/* Input field for trip title */}
        <label>Title</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          value={post.title}
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
          value={post.description}
          onChange={handleChange}
        ></textarea>
        <br />
        <br />

        {/* Input field for image URL */}
        <label>Image URL</label>
        <br />
        <input
          type="text"
          id="img_url"
          name="img_url"
          value={post.img_url}
          onChange={handleChange}
        />
        <br />
        <br />

        {/* Input field for number of days (integer) */}
        <label>Number of Days</label>
        <br />
        <input
          type="number"
          id="num_days"
          name="num_days"
          value={post.num_days}
          onChange={handleChange}
          min="0" // Ensure the value is non-negative
        />
        <br />
        <br />

        {/* Input field for start date (formatted as date) */}
        <label>Start Date</label>
        <br />
        <input
          type="date"
          id="start_date"
          name="start_date"
          value={post.start_date}
          onChange={handleChange}
        />
        <br />
        <br />

        {/* Input field for end date (formatted as date) */}
        <label>End Date</label>
        <br />
        <input
          type="date"
          id="end_date"
          name="end_date"
          value={post.end_date}
          onChange={handleChange}
        />
        <br />
        <br />

        {/* Input field for total cost (decimal number) */}
        <label>Total Cost</label>
        <br />
        <input
          type="number"
          id="total_cost"
          name="total_cost"
          value={post.total_cost}
          onChange={handleChange}
          step="0.01" // Allow two decimal places
          min="0" // Ensure the value is non-negative
        />
        <br />
        <br />

        {/* Submit button to create the trip */}
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default CreateTrip;
