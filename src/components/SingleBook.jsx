/* TODO - add your code to create a functional React component that renders 
details for a single book. Fetch the book data from the provided API. You may 
consider conditionally rendering a 'Checkout' button for logged in users. */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const baseUrl = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com";

function SingleBook({ token }) {
  const [book, setBook] = useState(null);
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getBook();
  }, [id]);

  async function getBook() {
    fetch(baseUrl + "/api/books/" + id, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setBook(result.book);
      })
      .catch(console.error);
  }

  async function checkoutBook() {
    fetch(baseUrl + "/api/books/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        available: false,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.book) {
          navigate("/account");
        }
      })
      .catch(console.error);
  }

  return (
    <div className="singlebook">
      <h2>
        {book?.title} <span>Available</span>
      </h2>
      <h5>By: {book?.author}</h5>
      <img src={book?.coverimage} alt={book?.title} />
      <p>{book?.description}</p>
      {token && <button onClick={checkoutBook}>Check out Book</button>}
    </div>
  );
}

export default SingleBook;
