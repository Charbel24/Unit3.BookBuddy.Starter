/* TODO - add your code to create a functional React component that renders a login form
 */

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const baseUrl = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com";

function Login({setToken}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { email, password };
    fetch(baseUrl + "/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.name === "IncorrectCredentialsError") {
          setError(result.message)
        }
        if (result.token) {
         setToken(result.token)
           localStorage.setItem("token", result.token);
           navigate("/account");         
        }
      })
      .catch(console.error);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Login</button>
        <p>
          Dont have an account? <Link to="/register">Register</Link>
        </p>
        {
          error && <p>{error}</p>
        }
      </form>
    </div>
  );
}

export default Login;
