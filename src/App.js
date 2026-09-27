import React, { useEffect, useState } from "react";
import DropdownButton from "./component/DropdownButton";

const API_URL =
  "https://api.quicksell.co/v1/internal/frontend-assignment";

const TARGET_USER_ID = "usr-2";

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [userTickets, setUserTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(
            `API request failed with status ${response.status}`
          );
        }

        const data = await response.json();

        console.log("AI Review - API Response:", data);

        if (!Array.isArray(data.tickets)) {
          throw new Error("Invalid API response: tickets must be an array");
        }

        setTickets(data.tickets);

        const filteredTickets = data.tickets.filter(
          (ticket) => ticket.userId === TARGET_USER_ID
        );

        setUserTickets(filteredTickets);

        console.log("AI Review - All Tickets:", data.tickets);
        console.log("AI Review - User Tickets:", filteredTickets);
      } catch (err) {
        console.error("AI Review - Fetch Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  useEffect(() => {
    console.log("AI Review - userTickets state changed:", userTickets);
  }, [userTickets]);

  return (
    <div>
      <DropdownButton />

      {loading && <p>Loading tickets...</p>}

      {error && (
        <p>
          Error loading tickets: {error}
        </p>
      )}

      {!loading && !error && (
        <div>
          <p>Total tickets: {tickets.length}</p>
          <p>User tickets: {userTickets.length}</p>
        </div>
      )}
    </div>
  );
};

export default App;

