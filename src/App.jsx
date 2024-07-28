import { useState } from "react";
import bookLogo from "./assets/books.png";
import { Routes, Route, Navigate } from "react-router-dom";
import Books from "./components/Books";
import Navigations from "./components/Navigations";
import Login from "./components/Login";
import Register from "./components/Register";
import Account from "./components/Account";
import SingleBook from "./components/SingleBook";
const baseUrl = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com";

function App() {
  const savedToken = localStorage.getItem("token");
  const [token, setToken] = useState(savedToken);
  
  
  return (
    <>
      <h1 className="title">
        <img id="logo-image" src={bookLogo} />
        Book Buddy
      </h1>
      <Navigations token={token} />

      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/books" element={<Books />} />
        <Route path="/login" element={<Login setToken={setToken}/>} />
        <Route path="/register" element={<Register setToken={setToken}/>} />
        <Route
          path="/account"
          element={token ? <Account /> : <Navigate to="/login" />}
        />
        <Route path="/books/:id" element={<SingleBook token={token} />} />
      </Routes>
    </>
  );
}

export default App;
