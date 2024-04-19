import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'; 

const API_BASE = process.env.REACT_APP_API_BASE;
function WorkingWithObjects() {
  // create a state variable that holds
  // default values for the form below.
  // eventually we'll fetch this initial
  // data from the server and populate
  // the form with the remote data so
  // we can modify it here in the UI
  const [assignment, setAssignment] = useState({
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  });

  const ASSIGNMENT_URL = `${API_BASE}/a5/assignment`

  const fetchAssignment = async () => {
    const response = await axios.get(`${ASSIGNMENT_URL}`);
    setAssignment(response.data);
  };
  const updateTitle = async () => {
    const response = await axios
      .get(`${ASSIGNMENT_URL}/title/${assignment.title}`);
    setAssignment(response.data);
  };
  useEffect(() => {
    fetchAssignment();
  }, [API_BASE, fetchAssignment]);


  // Add additional state for the module
  const [module, setModule] = useState({
    id: "", name: "", description: "", course: ""
  });

  // Function to fetch module data from the server
  const fetchModule = async () => {
    const response = await fetch(`${API_BASE}/a5/module`);
    const data = await response.json();
    setModule(data);
  };

  // Function to update module's name on the server
  const updateModuleName = async (newName: string) => {
    await fetch(`${API_BASE}/a5/module/name/${newName}`);
    fetchModule(); // Refetch module to show updated name
  };

  return (
    <div className="container mt-3">
      <h3>Working With Objects</h3>
      <h3>Modifying Properties</h3>
      <input onChange={(e) => setAssignment({
            ...assignment, title: e.target.value })}
        value={assignment.title} type="text" />
      <button onClick={updateTitle} >
        Update Title to: {assignment.title}
      </button>
      <button onClick={fetchAssignment} >
        Fetch Assignment
      </button>

      <h4>Retrieving Objects</h4>
      {/* Retrieve assignment object */}
      <a className="btn btn-secondary mb-3" href={ASSIGNMENT_URL}>Get Assignment</a>

      <h4>Retrieving Properties</h4>
      {/* Retrieve assignment title */}
      <a className="btn btn-info mb-3" href={`${ASSIGNMENT_URL}/title`}>Get Title</a>

      <h3>Module Operations</h3>
      {/* Retrieve and update module details */}
      <button className="btn btn-success mb-2" onClick={fetchModule}>Get Module</button>
      <div>Name: {module.name}</div>
      <div>Description: {module.description}</div>
      {/* Input and button to update module's name */}
      <input className="form-control"
        type="text"
        value={module.name}
        onChange={(e) => setModule({ ...module, name: e.target.value })}
      />
      <button className="btn btn-warning mt-2" onClick={() => updateModuleName(module.name)}>Update Module Name</button>
    </div>
  );
}

export default WorkingWithObjects;
