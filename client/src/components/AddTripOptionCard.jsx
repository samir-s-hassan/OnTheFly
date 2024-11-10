import React from 'react';
import { useParams } from 'react-router-dom';
import './Card.css';

// Component to display a card with a destination and an option to add it to a trip
const AddTripOptionCard = (props) => {
  // Extract the `destination_id` from the URL parameters using React Router
  const { destination_id } = useParams();

  // Function to handle adding the selected destination to a specific trip
  const addToTrip = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior (page reload)

    // Setup the POST request options to add the destination to the trip
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Send the trip ID and destination ID in the request body
      body: JSON.stringify({ trip_id: props.id, destination_id: destination_id }),
    };

    // Make a POST request to associate the destination with the selected trip
    fetch('/api/trips-destinations', options);

    // Redirect the user to the homepage after adding the destination to the trip
    window.location.href = '/';
  };

  return (
    <div
      className="Card"
      // Inline style to set the background image of the card
      style={{ backgroundImage: `url(${props.img_url})` }}
    >
      {/* Container for the card content */}
      <div className="card-info">
        {/* Display the title of the destination */}
        <h2 className="title">{props.title}</h2>

        {/* Display the description of the destination */}
        <p className="description">{props.description}</p>

        {/* Button to add the destination to the trip */}
        <button className="addToTrip" onClick={addToTrip}>
          + Add to Trip
        </button>
      </div>
    </div>
  );
};

export default AddTripOptionCard;
