import { IoEllipsisVertical } from "react-icons/io5";
import { GoCircle } from "react-icons/go";
import "./index.css";
import "./course-color.css";
import React, { useState, forwardRef } from 'react';
interface CourseColorProps {
  setShowColorPicker: (show: boolean) => void;
}
const colors = [
  "#BD3C14", "#FF2717", "#E71F63", "#8F3E97", "#65499D",
  "#4554A4", "#1770AB", "#0B9BE3", "#06A3B7", "#009688",
  "#009606", "#8D9900", "#D97900", "#FD5D10", "#F06291"
];

const CourseColor = forwardRef<HTMLDivElement, CourseColorProps>((props, ref) => {
  const [selectedColor, setSelectedColor] = useState("#008400");
  const [showCircleIcon, setShowCircleIcon] = useState(false);

  const handleEllipsisClick = () => {
    setShowCircleIcon(true);
    setTimeout(() => {
      setShowCircleIcon(false);
    }, 500);
  };

  const handleColorClick = (color: React.SetStateAction<string>) => {
    setSelectedColor(color);
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

      <div className="nickname">Nickname</div>

      <div className="course-name">Course 4</div>

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

      <div className="selected-color">
        <span>#{selectedColor.substr(1)}</span>
      </div>

      <div className="buttons">
      <button className="cancel-button"  onClick={() => props.setShowColorPicker(false)}>Cancel</button>
        <button className="apply-button">Apply</button>
      </div>
    </div>
  );
});

export default CourseColor;