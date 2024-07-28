/* TODO - add your code to create a functional React component that renders a
 registration form */
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const baseUrl = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com";

function Register({setToken}) {
    const [firstname,setFirstname]=useState("")
    const [email,setEmail]=useState("")
    const [lastname,setLastname]=useState("")
    const [password,setPassword]=useState("")
    
   const navigate=useNavigate() 
    
    const handleSubmit=(e)=>{
        e.preventDefault()
        const data ={firstname,lastname,email,password}
        fetch(baseUrl+'/api/users/register', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          }).then(response => response.json())
            .then(result => {
            setToken(result.token)
              localStorage.setItem("token",result.token)
              navigate("/account")
            })
            .catch(console.error);
          
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
        <label>First Name 
                <input type="text" onChange={(e)=>setFirstname(e.target.value)}/>
            </label>
        <label>Last Name 
                <input type="text" onChange={(e)=>setLastname(e.target.value)}/>
            </label>
            <label>Email
                <input type="email" onChange={(e)=>setEmail(e.target.value)}/>
            </label>
            <label>Password
                <input type="password" onChange={(e)=>setPassword(e.target.value)}/>
            </label>
            <button type="submit">Register</button>
            <p>Already have an account <Link to="/login">Login</Link></p>
        </form>
    </div>
  )
}

export default Register