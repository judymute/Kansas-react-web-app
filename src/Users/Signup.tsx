import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import axios from "axios"; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
axios.defaults.withCredentials = true

export default function Signup() {
  const [error, setError] = useState("");
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const signup = async () => {
    try {
      const response = await client.signup(user);
      console.log("Signup Response:", response);
      if (response && response.username) {
        // Update the session with the new user's data
        await client.signin({ username: response.username, password: response.password });
        navigate("/Kanbas/Account/Profile");
      }
    } catch (err) {
      console.error("Signup Error:", err);
      if (axios.isAxiosError(err)) {
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("An error occurred during signup.");
        }
      } else {
        setError("Failed to sign up due to an unexpected error.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1>Signup</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form>
        <div className="mb-3">
          <input 
            type="text"
            className="form-control"
            value={user.username} 
            onChange={(e) => setUser({...user, username: e.target.value})}
            placeholder="Enter username"
          />
        </div>
        <div className="mb-3">
          <input 
            type="password"
            className="form-control"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="Enter password"
          />
        </div>
        <button className="btn btn-primary" onClick={signup}>Signup</button>
      </form>
      <div className="mt-3">
        <Link to="/Kanbas/Account/Signin" className="link-primary">Sign In</Link>
      </div>
    </div>
  );
}
