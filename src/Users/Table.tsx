import React, { useState, useEffect } from "react";
import { BsTrash3Fill, BsPlusCircleFill, BsPencil, BsFillCheckCircleFill } from "react-icons/bs";
import * as client from "./client";
import { User } from "./client";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<User>({
    _id: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    role: "USER",
  });
  const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    setSelectedUserIndex(index);
  };

  const deleteUser = async (user: User) => {
    try {
      await client.deleteUser(user);
      setUsers(users.filter((u) => u._id !== user._id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (updatedUser: User) => {
    try {
      await client.updateUser(updatedUser);
      setUsers(users.map((u) => (u._id === updatedUser._id ? updatedUser : u)));
      setSelectedUserIndex(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    setSelectedUserIndex(null);
  };

  const createUser = async () => {
    try {
      const createdUser = await client.createUser(newUser);
      setUsers([createdUser, ...users]);
      setNewUser({
        _id: "",
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        dob: "",
        role: "USER",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mt-3">
      <h1>User Table</h1>
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th>Username</th>
            <th>Password</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                className="form-control"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              />
            </td>
            <td>
              <input
                type="password"
                className="form-control"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                value={newUser.firstName}
                onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                value={newUser.lastName}
                onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
              />
            </td>
            <td>
              <input
                type="email"
                className="form-control"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </td>
            <td>
              <input
                type="date"
                className="form-control"
                value={newUser.dob}
                onChange={(e) => setNewUser({ ...newUser, dob: e.target.value })}
              />
            </td>
            <td>
              <select
                className="form-select"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value as any })}
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="FACULTY">Faculty</option>
                <option value="STUDENT">Student</option>
              </select>
            </td>
            <td>
              <button className="btn btn-success" onClick={createUser}>
                <BsPlusCircleFill />
              </button>
            </td>
          </tr>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>
                {selectedUserIndex === index ? (
                  <input
                    type="text"
                    className="form-control"
                    value={user.username}
                    onChange={(e) => {
                      const updatedUsers = [...users];
                      updatedUsers[index] = { ...user, username: e.target.value };
                      setUsers(updatedUsers);
                    }}
                  />
                ) : (
                  user.username
                )}
              </td>
              <td>
                {selectedUserIndex === index ? (
                  <input
                    type="password"
                    className="form-control"
                    value={user.password}
                    onChange={(e) => {
                      const updatedUsers = [...users];
                      updatedUsers[index] = { ...user, password: e.target.value };
                      setUsers(updatedUsers);
                    }}
                  />
                ) : (
                  "********"
                )}
              </td>
              <td>
                {selectedUserIndex === index ? (
                  <input
                    type="text"
                    className="form-control"
                    value={user.firstName}
                    onChange={(e) => {
                      const updatedUsers = [...users];
                      updatedUsers[index] = { ...user, firstName: e.target.value };
                      setUsers(updatedUsers);
                    }}
                  />
                ) : (
                  user.firstName
                )}
              </td>
              <td>
                {selectedUserIndex === index ? (
                  <input
                    type="text"
                    className="form-control"
                    value={user.lastName}
                    onChange={(e) => {
                      const updatedUsers = [...users];
                      updatedUsers[index] = { ...user, lastName: e.target.value };
                      setUsers(updatedUsers);
                    }}
                  />
                ) : (
                  user.lastName
                )}
              </td>
              <td>
                {selectedUserIndex === index ? (
                  <input
                    type="email"
                    className="form-control"
                    value={user.email}
                    onChange={(e) => {
                      const updatedUsers = [...users];
                      updatedUsers[index] = { ...user, email: e.target.value };
                      setUsers(updatedUsers);
                    }}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {selectedUserIndex === index ? (
                  <input
                    type="date"
                    className="form-control"
                    value={user.dob}
                    onChange={(e) => {
                      const updatedUsers = [...users];
                      updatedUsers[index] = { ...user, dob: e.target.value };
                      setUsers(updatedUsers);
                    }}
                  />
                ) : (
                  user.dob
                )}
              </td>
              <td>
                {selectedUserIndex === index ? (
                  <select
                    className="form-select"
                    value={user.role}
                    onChange={(e) => {
                      const updatedUsers = [...users];
                      updatedUsers[index] = { ...user, role: e.target.value as any };
                      setUsers(updatedUsers);
                    }}
                  >
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                    <option value="FACULTY">Faculty</option>
                    <option value="STUDENT">Student</option>
                  </select>
                ) : (
                  user.role
                )}
              </td>
              <td>
                {selectedUserIndex === index ? (
                  <>
                    <button className="btn btn-primary" onClick={() => handleUpdate(user)}>
                      <BsFillCheckCircleFill />
                    </button>
                    <button className="btn btn-secondary" onClick={handleCancel}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button className="btn btn-warning" onClick={() => handleSelect(index)}>
                      <BsPencil />
                    </button>
                    <button className="btn btn-danger" onClick={() => deleteUser(user)}>
                      <BsTrash3Fill />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}