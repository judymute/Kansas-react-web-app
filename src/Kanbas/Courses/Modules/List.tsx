import React, { useState } from "react";
import "./index.css";
import { modules } from "../../Database";
import { FaEllipsisV, FaCheckCircle, FaPlus, FaPlusCircle } from "react-icons/fa"; 
import { useParams } from "react-router";

function ModuleList() {
  const { courseId } = useParams();
  console.log(courseId);
  console.log(modules);
  const modulesList = modules.filter((module) => module.course === courseId);
  console.log("Retrieved courseId:", courseId); 
  const [selectedModule, setSelectedModule] = useState(modulesList[0]);

  return (
    <>
      <div className="row d-block center">
        <div className="module-button-container">
          {/* Converted buttons and select dropdown */}
          <button className="btn module-button" type="button">Collapse All</button>
          <button className="btn module-button" type="button">View Progress</button>
          <select className="btn module-button">
            <option>Publish All</option>
            <option>Publish All Modules and Items</option>
            <option>Publish Modules only</option>
            <option>UnPublish All Modules</option>
          </select>
          <button className="btn add-module-button" type="button">+ Module</button>
        </div>
        <div className="col">
          <ul className="list-group wd-modules">
            {modulesList.map((module, index) => (
              <li key={index}
                className="list-group-item"
                onClick={() => setSelectedModule(module)}>
                <div className="module-header">
                  <FaEllipsisV className="me-2" />
                  {module.name}
                  <span className="float-end">
                    <FaCheckCircle className="text-success" />
                    <FaPlusCircle className="ms-2" />
                    <FaEllipsisV className="ms-2" />
                  </span>
                </div>
                {selectedModule._id === module._id && (
                  <ul className="list-group">
                    {module.lessons?.map((lesson, index) => (
                      <li className="list-group-item" key={index}>
                        <FaEllipsisV className="me-2" />
                        {lesson.name}
                        <span className="float-end">
                          <FaCheckCircle className="text-success" />
                          <FaEllipsisV className="ms-2" />
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ModuleList;
