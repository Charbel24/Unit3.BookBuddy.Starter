/* TODO - add your code to create a functional React component that displays 
all of the available books in the library's catalog. Fetch the book data from the 
provided API. Users should be able to click on an individual book to navigate to 
the SingleBook component and view its details. */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const baseUrl = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com";

function Books() {
  const [books, setBooks] = useState([]);
  const [availableBooks, setAvailableBooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, []);

  async function getBooks() {
    fetch(baseUrl + "/api/books", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        const availableBooks = result.books.filter(
          (book) => book.available === true
        );
        setBooks(availableBooks);
        setAvailableBooks(availableBooks);
      })
      .catch(console.error);
  }

  function filterBooks(text) {
    const filteredBooks = availableBooks.filter((book) =>
      book.title.includes(text)
    );
    setBooks(filteredBooks);
  }
  return (
    <div className="books_page">
      <h2>Available Books</h2>
      <div className="search">
        <input
          onChange={(e) => filterBooks(e.target.value)}
          type="text"
          placeholder="Search for a Book!"
        />
      </div>
      <div className="books_container">
        {books.map((book) => (
          <div className="book_item" key={book.id}>
            <img src={book.coverimage} alt={book.title} />
            <Link to={`/books/${book.id}`}>{book.title}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Books;
