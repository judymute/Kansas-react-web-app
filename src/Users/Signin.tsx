import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import 'bootstrap/dist/css/bootstrap.min.css';

interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}

function isErrorWithResponse(error: any): error is ErrorResponse {
  return error.response !== undefined && error.response.data !== undefined && typeof error.response.data.message === 'string';
}

export default function Signin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const signin = async () => {
    try {
      await client.signin(credentials);
      navigate("/Kanbas/Account/Profile");
    } catch (err: unknown) {
      console.error("Signin Error:", err);
      if (isErrorWithResponse(err)) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred during signin.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1>Signin</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            placeholder="Enter username"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            placeholder="Enter password"
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={signin}>
          Sign In
        </button>
      </form>
      <div className="mt-3">
        <Link to="/Kanbas/Account/Signup" className="link-primary">Sign Up</Link>

      </div>
      <p>
        Only Admin has access to the user table, 
        <br/>
        Please login as Username: 1234.
        <br/>
        Password: 1234 to see the user table
      </p>
    </div>
  );
}
