import React, { useState } from "react";
import "./index.css";
import { modules } from "../../Database";
import { FaEllipsisV, FaCheckCircle, FaPlus, FaPlusCircle, FaCaretRight, FaCaretDown } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addModule,
  deleteModule,
  updateModule,
  setModule,
} from "./reducer";
import { KanbasState } from "../../store";

function ModuleList() {
  const { courseId } = useParams();
  const moduleList = useSelector((state: KanbasState) => state.modulesReducer.modules);
  const module = useSelector((state: KanbasState) => state.modulesReducer.module);
  const modulesList = moduleList.filter((module) => module.course === courseId);
  const [isAddingModule, setIsAddingModule] = useState(false);
  const dispatch = useDispatch();

  // console.log("Retrieved courseId:", courseId);
  const [selectedModule, setSelectedModule] = useState(modulesList[0]);

  return (

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
        <button onClick={() => setIsAddingModule(prev => !prev)} className="btn add-module-button" type="button">+ Module</button>
      </div>

    
      <div className="col">
        <ul className="list-group wd-modules">
        {isAddingModule && (
          <li className="list-group-item">

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'top' }}>
              <div>
                <input
                  className="form-control"
                  value={module.name}
                  onChange={(e) => dispatch(setModule({ ...module, name: e.target.value }))}
                  style={{ display: 'block', marginBottom: '8px' }}
                />
                <textarea
                  className="form-control"
                  value={module.description}
                  onChange={(e) => dispatch(setModule({ ...module, description: e.target.value }))}
                  style={{ display: 'block' }}
                />
              </div>
              <div>
                <button
                  onClick={() =>
                    dispatch(addModule({ name: module.name, description: module.description, course: courseId }))
                  }
                  type="button"
                  className="btn btn-success"
                >
                  Add
                </button>
                <button onClick={() => dispatch(updateModule(module))} type="button" className="btn btn-primary">
                  Update
                </button>
              </div>

            </div>
       



          </li>
               )}

          {modulesList
            .filter((module) => module.course === courseId)
            .map((module, index) => (
              <li key={index}
                className="list-group-item-outer"
                onClick={() => setSelectedModule(module)}>

                <div className="module-header" >
                  <FaCaretRight className="me-2 expand-icon" />
                  {module.name}
                  <button
                    onClick={() => dispatch(deleteModule(module._id))} type="button" className="btn btn-danger me-2 ms-4">
                    Delete
                  </button>

                  <button
                    onClick={() => dispatch(setModule(module))} type="button" className="btn btn-success">
                    Edit
                  </button>

                  <span
                    className="module-icons float-end">
                    <FaCheckCircle className="icon text-success" />
                    <FaPlusCircle className="icon ms-2" />
                    <FaEllipsisV className="icon ms-2 ellipsis-icon" />
                  </span>

                </div>
                {selectedModule._id === module._id && (
                  <ul className="list-group">
                    {module.lessons?.map((lesson: { name: string }, index: number) => (
                      <li className="list-group-item-inner" key={index}>
                        <FaEllipsisV className="me-2 ellipsis-icon" />
                        {lesson.name}
                        <span className="float-end">
                          <FaCheckCircle className="text-success" />
                          <FaEllipsisV className="ms-2 ellipsis-icon" />
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
            

  );
}

export default ModuleList;
