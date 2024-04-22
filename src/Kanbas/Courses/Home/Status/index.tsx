import { Link } from "react-router-dom";
import "./index.css";
import { FaCalendarAlt } from 'react-icons/fa'; 

// Define a type for the task
type Task = {
  id: number;
  course: string;
  description: string;
};

function Status() {
  return (
    <>
      <div className="right-side col">

          <div className="vertical-button-container right-side">
            <Link to="#" className="btn button-link">Import Existing Content</Link>
            <Link to="#" className="btn button-link">Import From Commons</Link>
            <Link to="#" className="btn button-link">Choose Home Page</Link>
            <Link to="#" className="btn button-link">View Course Stream</Link>
            <Link to="#" className="btn button-link">New Announcement</Link>
            <Link to="#" className="btn button-link">New Analytics</Link>
            <Link to="#" className="btn button-link">View Course Notifications</Link>
          </div>
     

        <div className="row">
          <div className="todo-list">
            <h5>To Do</h5>
            <hr/>
            <div className="tasks">
              <ul>
                <li className="link-list">
                <FaCalendarAlt className="event-icon" />
                  <Link to="#" className="link">Lecture CS4550.12631.202410 Sep 7 at 11:45am</Link>
                </li>
                <li className="link-list">
                  <FaCalendarAlt className="event-icon"/>
                  <Link to="#" className="link">Lecture CS4550.12631.202410 Sep 11 at 11:45am</Link>
                </li>
                <li className="link-list">
                <FaCalendarAlt className="event-icon" />
                  <Link to="#" className="link">CS5610 06 SP23 Lecture Sep 11 at 6pm</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Status;

