import { Link, useLocation } from "react-router-dom";
import "./index.css";

function CourseNavigation() {
  const links = ["Home", "Modules", "Piazza", "Grades", "Assignments", "Quizzes", "People", "Panopto Video", "Announcements"];
  const { pathname } = useLocation();

  // Extract courseId from the URL
  const courseId = pathname.split('/')[3]; // Assuming the courseId is the fourth segment in the URL path

  return (
      <ul className="wd-navigation d-none d-md-block">
        {links.map((link, index) => (
          <li key={index} className={pathname.includes(link) ? "wd-active" : ""}>
            {/* Use courseId extracted from the URL */}
            <Link to={`/Kanbas/Courses/${courseId}/${link}`}>{link}</Link>
          </li>
        ))}
      </ul>

  
  );
}

export default CourseNavigation;
