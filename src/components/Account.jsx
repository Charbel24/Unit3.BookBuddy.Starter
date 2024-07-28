/* TODO - add your code to create a functional React component that renders 
account details for a logged in user. Fetch the account data from the provided API. 
You may consider conditionally rendering a message for other users that prompts them to log 
in or create an account.  */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const baseUrl = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com";

function Account() {
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    getUser();
    getReservations();
  }, []);

  async function getUser() {
    fetch(baseUrl + "/api/users/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setUser(result);
      })
      .catch(console.error);
  }

  async function getReservations() {
    fetch(baseUrl + "/api/reservations", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setReservations(result.reservation)
      })
      .catch(console.error);
  }

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  }

  function returnBook(bookId) {
    fetch(baseUrl + "/api/reservations/" + bookId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.deletedReservation) {
          getReservations();
        }
      })
      .catch(console.error);
  }

  return (
    <div>
      <section>
        <h3>
          Name:{" "}
          <span>
            {user?.firstname} {user?.lastname}
          </span>{" "}
        </h3>
        <p>
          Email: <span>{user?.email}</span>
        </p>
        <button onClick={logout}>Log out</button>
      </section>
      <section>
        {reservations?.map((book) => (
          <li key={book.id}>
            <h5>{book.title}</h5>
            <p>{book.author}</p>
            <button onClick={() => returnBook(book.id)}>Return Book</button>
          </li>
        ))}
      </section>
    </div>
  );
}

export default Account;
