import React from "react";
import { FaCheckCircle, FaEllipsisV, FaPlusCircle, FaCaretRight } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { assignments } from "../../Database";
import "./index.css";
import SearchBar from "./Search";

function Assignments() {
  const { courseId } = useParams();
  console.log(courseId);
  const assignmentList = assignments.filter(
    (assignment) => assignment.course === courseId
  );

  return (
    <div className="row d-flex" style={{flexGrow: 1, maxWidth: 1100}}>
      <div className="module-button-container" style={{height: 70}}>
        <SearchBar />
        <button className="btn module-button">
        + Group
        </button>
        <button className="btn add-module-button" type="button">+ Assignment</button>
      </div>
      <div className="d-flex" style={{ flexGrow: 1 }}>
        <ul className="list-group wd-modules" style={{ flexGrow: 1 }}>
          <li className="list-group-item" style={{ padding: "0"}}>
            <div className="module-header list-group-item-outer">
              <FaCaretRight className="me-2 expand-icon" /> ASSIGNMENTS
              <span className="float-end">
                <FaCheckCircle className="text-success" />
                <FaPlusCircle className="ms-2" />
                <FaEllipsisV className="ms-2 ellipsis-icon" />
              </span>
            </div>
            <ul className="list-group">
              {assignmentList.map((assignment) => (
                <li key={assignment._id} className="list-group-item-inner">
                  <FaEllipsisV className="icon me-2 ellipsis-icon" />
                  <Link to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}>
                    {assignment.title}
                  </Link>
                  <span className="float-end">
                    <FaCheckCircle className="text-success" />
                    <FaEllipsisV className="ms-2 ellipsis-icon" />
                  </span>
                </li>
              ))}
            </ul>
          </li>
        </ul>

      </div>
      {/* Add buttons and other fields here */}

    </div>
  );
}

export default Assignments;
