import { IoEllipsisVertical } from "react-icons/io5";
import { GoCircle } from "react-icons/go";
import "./course-color.css";
import React, { useState, forwardRef } from 'react';


interface CourseColorProps {
  setShowColorPicker: (show: boolean) => void;
  selectedCourseId: string | null;
  setSelectedCourseId: (courseId: string | null) => void;
  course?: any; 
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  updateCourse: (selectedColor: string) => void; // Add this line
}
const colors = [
  "#BD3C14", "#FF2717", "#E71F63", "#8F3E97", "#65499D",
  "#4554A4", "#1770AB", "#0B9BE3", "#06A3B7", "#009688",
  "#009606", "#8D9900", "#D97900", "#FD5D10", "#F06291"
];

const CourseColor = forwardRef<HTMLDivElement, CourseColorProps>((props, ref) => {
  const [selectedColor, setSelectedColor] = useState("#008400");
  const [showCircleIcon, setShowCircleIcon] = useState(false);
  const [courseName, setCourseName] = useState(props.course ? props.course.name : '');

  const handleEllipsisClick = () => {
    setShowCircleIcon(true);
    setTimeout(() => {
      setShowCircleIcon(false);
    }, 500);
  };

  const handleColorClick = (color: React.SetStateAction<string>) => {
    setSelectedColor(color);
  };
  
  const handleColorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputColor = e.target.value;
    if (inputColor.startsWith('#') && inputColor.length === 7) {
      setSelectedColor(inputColor);
    }
  };


  const handleApplyClick = async () => {
    try {
      await props.updateCourse(selectedColor);
      props.setShowColorPicker(false);
      props.setSelectedCourseId(null);
    } catch (error) {
      console.error('Error updating course color:', error);
    }
  };

  return (
    <div className="color-picker" ref={ref}>
      <div className="header">
        <span>Color</span>
        <span>Move</span>
        <div className="ellipsis-icon-container">
          <GoCircle className={`circle-icon ${showCircleIcon ? 'show-circle-icon' : ''}`} />
          <IoEllipsisVertical className="ellipsis-icon" onClick={handleEllipsisClick} />
        </div>
      </div>

      <div className="nickname">
        Nickname
      </div>
      <div className="course-color-name-container">
      <input
        type="text"
        placeholder={courseName}
        onChange={(e) => setCourseName(e.target.value)}
        className="course-color-name"
      />
      </div>


      <div className="color-palette">
        {colors.map((color) => (
          <div
            key={color}
            className={`color-box ${selectedColor === color ? "selected" : ""}`}
            style={{ backgroundColor: color }}
            onClick={() => handleColorClick(color)}
          />
        ))}
      </div>

      <div className="selected-color-container">
      <div className="selected-color-box" style={{ backgroundColor: selectedColor }}></div>
        <input className="selected-color" value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}/>
      </div>

      <div className="buttons">
        <button
          className="cancel-button"
          onClick={() => {
            props.setShowColorPicker(false);
            props.setSelectedCourseId(null);
          }}
        >
          Cancel
        </button>
        <button className="apply-button" onClick={handleApplyClick}>Apply</button>
      </div>
    </div>
  );
});

export default CourseColor;