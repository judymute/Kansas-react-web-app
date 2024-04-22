import React from 'react';
import { Link } from 'react-router-dom';
import './QuizBreadcrumb.css';
import { ImCross } from 'react-icons/im';
import courseBreadcrumb from "./course-breadcrumb.png";

interface QuizBreadcrumbprops {
  showBreadcrumb: boolean;
  courseId: string;
  onClose: () => void;
}

const QuizBreadcrumb = ({ showBreadcrumb, courseId , onClose}: QuizBreadcrumbprops) => {
  return (
    <div className={`quiz-breadcrumb-container ${showBreadcrumb ? 'slide-in' : 'slide-out'}`}>
      <div className="breadcrumb-header">
        <h4 className="quizzes-header">Quizzes</h4>
        <img src={courseBreadcrumb} alt="Course Breadcrumb" className="course-breadcrumb-icon"      onClick={onClose}/>
      </div>
      <br />
      <h5>Assess student understanding</h5>
      <div className="breadcrumb">
        <p>
          Use quizzes to challenge student understanding and assess comprehension of course material. The New Quizzes assessment engine allows you to create up to 13 types of question types and content. If New Quizzes isn't enabled for your institution, Classic Quizzes are still available to help you achieve your objectives.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget aliquam lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl. Nullam auctor, nisl eget aliquam lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget aliquam lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl. Nullam auctor, nisl eget aliquam lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl.
        </p>
      </div>
      <br />
      <hr />
    </div>
  );
};


export default QuizBreadcrumb;