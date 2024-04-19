import React from 'react';
import { Link } from 'react-router-dom';
import "./breadcrumb.css";
import { ImCross } from "react-icons/im";

interface BreadcrumbComponentProps {
  showBreadcrumb: boolean;
}

const BreadcrumbComponent = ({ showBreadcrumb }: BreadcrumbComponentProps) => {
  return (
    <div className={`breadcrumb-container ${showBreadcrumb ? 'slide-in' : 'slide-out'}`}>
      <div className='exit-icon'>
      <ImCross/>
        </div>
      <h4 className='course-header'>Courses</h4>
      <hr />
      <Link to="/Kanbas/Courses" className="all-courses-link">All Courses</Link>
      <hr />
      <div className="breadcrumb">
        Welcome to your courses! To customize the list of courses, click on the "All Courses" link and star the courses to display.
      </div>
    </div>
  );
};

export default BreadcrumbComponent;