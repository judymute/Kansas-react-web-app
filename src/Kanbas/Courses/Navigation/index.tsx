import { Link, useLocation } from "react-router-dom";
import "./index.css";

function CourseNavigation() {
  const links = ["Home", "Modules", "Piazza", "Grades", "Assignments"];
  const { pathname } = useLocation();

  // Extract courseId from the URL
  const courseId = pathname.split('/')[3]; // Assuming the courseId is the fourth segment in the URL path

  return (
    <div className="wd-navigation-container">
      <ul className="wd-navigation">
        {links.map((link, index) => (
          <li key={index} className={pathname.includes(link) ? "wd-active" : ""}>
            {/* Use courseId extracted from the URL */}
            <Link to={`/Kanbas/Courses/${courseId}/${link}`}>{link}</Link>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default CourseNavigation;
