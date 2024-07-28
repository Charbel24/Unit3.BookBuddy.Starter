/* TODO - add your code to create a functional React component 
that renders a navigation bar for the different views in your single 
page application. You may consider conditionally rendering some options - 
for example 'Login' should be available if someone has not logged in yet. */

import React from "react";
import { NavLink } from "react-router-dom";

function Navigations({ token }) {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/books">Books</NavLink>
        </li>
        {token ? (
          <li>
            <NavLink to="/account">Account</NavLink>
          </li>
        ) : (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navigations;
