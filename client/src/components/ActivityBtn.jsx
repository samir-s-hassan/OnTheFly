import React, { useState } from "react";
import "./ActivityBtn.css";

// Component for displaying an activity button with upvote functionality
const ActivityBtn = (props) => {
  // State to store the current number of votes for the activity
  const [num_votes, setNumVotes] = useState(props.num_votes);

  // Function to handle updating the vote count
  const updateCount = () => {
    // Set up the PATCH request options to update the vote count on the server
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      // Increment the current number of votes by 1 and send it in the request body
      body: JSON.stringify({ num_votes: num_votes + 1 }),
    };

    // Make a PATCH request to update the vote count for the activity with the given ID
    fetch("/api/activities/" + props.id, options);

    // Update the local state to reflect the new vote count
    setNumVotes((num_votes) => num_votes + 1);
  };

  return (
    // Render a button with the activity name and vote count
    <button className="activityBtn" id={props.id} onClick={updateCount}>
      {/* Display the activity name and the current number of upvotes */}
      {props.activity} <br /> {"△ " + num_votes + " Upvotes"}
    </button>
  );
};

export default ActivityBtn;
