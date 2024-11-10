import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./CreateDestination.css";

// Component for creating a new destination and linking it to a specific trip
const CreateDestination = () => {
  // State to store the destination details entered by the user
  const [destination, setDestination] = useState({
    destination: "",
    description: "",
    city: "",
    country: "",
    img_url: "",
    flag_img_url: "",
  });

  // Extract the trip_id from the URL parameters using React Router
  const { trip_id } = useParams();

  // Function to handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    // Update the corresponding field in the destination state
    setDestination((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // Function to handle creating a new destination and associating it with a trip
  const createDestination = async (event) => {
    event.preventDefault(); // Prevent page reload on form submission

    // Function to add a new destination to the database
    const addDestination = async () => {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Send the destination details in the request body
        body: JSON.stringify(destination),
      };

      // Make a POST request to the API to create a new destination
      const response = await fetch("/api/destination/create", options);
      const data = await response.json();

      // Set the destination state with the data returned from the API
      setDestination(data);
      return data.id; // Return the ID of the newly created destination
    };

    // Function to create an association between the trip and the destination
    const createTripDestination = async (destination_id) => {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Send the trip ID and destination ID in the request body
        body: JSON.stringify({
          trip_id: trip_id,
          destination_id: destination_id,
        }),
      };

      // Make a POST request to the API to link the trip and destination
      const response = await fetch("/api/trips-destinations/create", options);
      const data = await response.json();
      return data;
    };

    // Create a new destination and link it to the current trip
    const res = await addDestination();
    await createTripDestination(res);

    // Redirect the user to the homepage after successfully creating the destination
    window.location = "/";
  };

  return (
    <div>
      {/* Centered heading for the form */}
      <center>
        <h3>Add Destination</h3>
      </center>

      {/* Form to collect destination details */}
      <form>
        {/* Input field for destination name */}
        <label>Destination</label> <br />
        <input
          type="text"
          id="destination"
          name="destination"
          value={destination.destination}
          onChange={handleChange}
        />
        <br />
        <br />

        {/* Textarea for destination description */}
        <label>Description</label>
        <br />
        <textarea
          rows="5"
          cols="50"
          id="description"
          name="description"
          value={destination.description}
          onChange={handleChange}
        ></textarea>
        <br />

        {/* Input field for city */}
        <label>City</label>
        <br />
        <input
          type="text"
          id="city"
          name="city"
          value={destination.city}
          onChange={handleChange}
        />
        <br />
        <br />

        {/* Input field for country */}
        <label>Country</label>
        <br />
        <input
          type="text"
          id="country"
          name="country"
          value={destination.country}
          onChange={handleChange}
        />
        <br />
        <br />

        {/* Input field for destination image URL */}
        <label>Image URL</label>
        <br />
        <input
          type="text"
          id="img_url"
          name="img_url"
          value={destination.img_url}
          onChange={handleChange}
        />
        <br />
        <br />

        {/* Input field for country flag image URL */}
        <label>Flag Image URL</label>
        <br />
        <input
          type="text"
          id="flag_img_url"
          name="flag_img_url"
          value={destination.flag_img_url}
          onChange={handleChange}
        />
        <br />
        <br />

        {/* Display the Trip ID (read-only) */}
        <label>Trip ID</label>
        <br />
        <input
          type="text"
          id="trip_id"
          name="trip_id"
          value={trip_id}
          readOnly
        />
        <br />
        <br />

        {/* Submit button to create the destination */}
        <input type="submit" value="Submit" onClick={createDestination} />
      </form>
    </div>
  );
};

export default CreateDestination;
