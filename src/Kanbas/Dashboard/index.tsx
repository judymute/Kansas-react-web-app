import React from "react"; // add useState hook
import { Link } from "react-router-dom";
import { courses } from "../Database";
import { useState } from "react";
import * as db from "../Database";

function Dashboard(
  { courses, course, setCourse, addNewCourse,
    deleteCourse, updateCourse, publishedCoursesCount }: {
      courses: any[]; course: any; setCourse: (course: any) => void;
      addNewCourse: () => void; deleteCourse: (course: any) => void;
      updateCourse: () => void;
      publishedCoursesCount: number;
    }) {

  // console.log(courses);
  return (
    <div className="p-4">
      <h1>Dashboard</h1>
      <hr />


      <div className="row">
        <h2 className="mb-3">Add/Update a Course</h2>
        <div className="col">
          <input value={course.name} className="form-control mb-3"
            onChange={(e) => setCourse({ ...course, name: e.target.value })} placeholder="Course Name" />
        </div>
        <div className="col">
          <input value={course.number} className="form-control mb-3"
            onChange={(e) => setCourse({ ...course, number: e.target.value })} placeholder="Course Number" />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <label htmlFor="startDateInput" className="form-label">
            Start Date
          </label>

          <input value={course.startDate} className="form-control" type="date"
            onChange={(e) => setCourse({ ...course, startDate: e.target.value })} id="startDateInput" />

        </div>
        <div className="col">
          <label className="form-label" htmlFor="endDateInput">
            End Date
          </label>
          <input value={course.endDate} className="form-control" type="date"
            onChange={(e) => setCourse({ ...course, endDate: e.target.value })} id="endDateInput" />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <input
            value={course.image}
            className="form-control mb-3"
            onChange={(e) => setCourse({ ...course, image: e.target.value })}
            placeholder="Image URL"
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          {/* add button to invoke addNewCourse. Note no argument */}
          <button onClick={addNewCourse} type="button" className="btn btn-success me-2">
            Add
          </button>
          <button onClick={updateCourse} type="button" className="btn btn-primary">
            Update
          </button>
        </div>

      </div>


      <h2>Published Courses (9)</h2> <hr />



      <div className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course) => (
            <div key={course._id} className="col" style={{ width: 300, height: 270, marginBottom: 27 }}>

              <div className="card">
              <Link to={`/Kanbas/Courses/${course._id}/Home`}>
                  <img src={
                `/images/${course.image}`} className="card-img-top"
                  style={{ height: 165 }} />
                  </Link>
                
     
                <div className="card-body">
   
                  <Link className="card-title" to={`/Kanbas/Courses/${course._id}/Home`}
                    style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>       
                    {course.number} {course.name}
                    <br />

                  </Link>
                  <p className="card-text">{course.number}.{course._id}</p>

                  <button onClick={(event) => {
                    event.preventDefault();
                    setCourse(course);
                  }} type="button" className="btn btn-warning me-2">
                    Edit
                  </button>
                  <button onClick={(event) => {
                    event.preventDefault();
                    deleteCourse(course._id);
                  }} type="button" className="btn btn-danger me-2">
                    Delete
                  </button>
                  {/* <br />
                  <Link to={`/Kanbas/Courses/${course._id}/Home`} className="btn btn-primary">
                    Go </Link> */}
                </div>
              </div>
            </div>
          ))} </div>
      </div>
    </div>
  );
}
export default Dashboard;