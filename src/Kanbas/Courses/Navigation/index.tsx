import { Link, useLocation } from "react-router-dom";
import "./index.css";
import { useEffect, useState } from "react";
import QuizBreadcrumb from "./QuizBreadcrumb";

function CourseNavigation() {
  const links = ["Home", "Modules", "Piazza", "Grades", "Assignments", "Quizzes", "People", "Panopto Video", "Announcements"];
  const { pathname } = useLocation();
  const courseId = pathname.split('/')[3]; // Extract courseId from the URL
  const piazzaUrl = "https://piazza.com/class/lqlwl9wn2q969r";

  const [showBreadcrumb, setShowBreadcrumb] = useState(false);
  

  useEffect(() => {
    if (pathname.includes('Quizzes')) {
      setShowBreadcrumb(true);
    } else {
      setShowBreadcrumb(false);
    }
  }, [pathname]);

  const handleBreadcrumbClose = () => {
    setShowBreadcrumb(false);
  };


  return (
    <div className="course-navigation-container">
      <ul className="wd-navigation d-none d-md-block">
        {links.map((link, index) => (
          <li key={index} className={pathname.includes(link) ? "wd-active" : ""}>
            {link === "Piazza" ? (
              <a href={piazzaUrl} target="_blank" rel="noopener noreferrer">
                {link}
              </a>
            ) : (
              <Link to={`/Kanbas/Courses/${courseId}/${link}`}>{link}</Link>
            )}
          </li>
        ))}
      </ul>
      <QuizBreadcrumb showBreadcrumb={showBreadcrumb} courseId={courseId} onClose={handleBreadcrumbClose}/>
    </div>


  );
}

export default CourseNavigation;