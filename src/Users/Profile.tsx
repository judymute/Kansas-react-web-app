import * as client from "./client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

export default function Profile() {
  const [successMessage, setSuccessMessage] = useState("");
  const [profile, setProfile] = useState({
    username: "", password: "",
    firstName: "", lastName: "", dob: "", email: "", role: "USER"
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const save = async () => {
    const updatedProfile = {
      ...profile,
      dob: profile.dob ? new Date(profile.dob).toISOString().split('T')[0] : ''
    };
    setProfile(updatedProfile); // Update the profile state

    try {
      const response = await client.updateUser(updatedProfile);
      setProfile(response); // Update the profile state with the response from the server
      setSuccessMessage("Profile updated successfully!"); // Set the success message
      // Clear the success message after 3 seconds (3000 milliseconds)
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error saving profile:", error);
      setError("Failed to save profile.");
    }
  };


  const fetchProfile = async () => {
    try {
      const user = localStorage.getItem('user');
      if (user) {
        setProfile(JSON.parse(user));
      } else {
        const account = await client.profile();
        if (!account) {
          navigate("/Kanbas/Account/Signin");
        } else {
          setProfile(account);
        }
      }
    } catch (err) {
      console.error("Profile Error:", err);
      if (axios.isAxiosError(err) && err.response && err.response.status === 401) {
        navigate("/Kanbas/Account/Signin");
      } else {
        setError("Failed to fetch profile due to an unexpected error.");
      }
    }
  };

  const signout = async () => {
    await client.signout();
    localStorage.removeItem('user');
    navigate("/Kanbas/Account/Signin");
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="container mt-5">
      <h1>Profile</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && (
        <div className="alert alert-success">
          {successMessage}
        </div>
      )}
      <div className="mb-3">
        <button className="btn btn-primary me-2" onClick={save}>
          Save
        </button>
        <button className="btn btn-secondary" onClick={signout}>
          Signout
        </button>
      </div>
      {profile.role === "ADMIN" && (
        <div className="mb-3">
          <Link to="/Kanbas/Account/Admin/Users" className="btn btn-warning w-100 mb-3">
            Manage Users
          </Link>
        </div>
      )}
      {profile && (
        <form>
          <>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input type="text" className="form-control" value={profile.username} onChange={(e) =>
                setProfile({ ...profile, username: e.target.value })} />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" value={profile.password} onChange={(e) =>
                setProfile({ ...profile, password: e.target.value })} />
            </div>
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input type="text" className="form-control" value={profile.firstName} onChange={(e) =>
                setProfile({ ...profile, firstName: e.target.value })} />
            </div>
            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input type="text" className="form-control" value={profile.lastName} onChange={(e) =>
                setProfile({ ...profile, lastName: e.target.value })} />
            </div>
            <div className="mb-3">
              <label className="form-label">Date of Birth</label>
              <input type="date" className="form-control" value={profile.dob} onChange={(e) =>
                setProfile({ ...profile, dob: e.target.value })} />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={profile.email} onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })} />
            </div>
            <div className="mb-3">
              <label className="form-label">Role</label>
              {profile.role === "ADMIN" ? (
                <select
                  className="form-select"
                  value={profile.role}
                  onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                >
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                  <option value="FACULTY">Faculty</option>
                  <option value="STUDENT">Student</option>
                </select>
              ) : (
                <input
                  type="text"
                  className="form-control"
                  value={profile.role}
                  readOnly
                />
              )}
            </div>
            <p>
              Only the Admin can change the role of other users in the user table. Admin can also change their own role here. Others can only see their role.
            </p>
          </>

        </form>

      )}
    </div>
  );
}
