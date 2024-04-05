
import { useState, useEffect } from "react";
import "./index.css";
import { FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { RxTriangleDown, RxTriangleRight } from "react-icons/rx";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { PiDotsSixVerticalBold, PiDotsThreeVerticalBold } from "react-icons/pi";
import {
  addModule,
  deleteModule,
  updateModule,
  setModule,
  setModules,
} from "./reducer";
import * as client from "./client";
import { KanbasState } from "../../store";
import {Module} from "./reducer";

function ModuleList() {
  const { courseId } = useParams();
  const handleDeleteModule = (moduleId: string) => {
    client.deleteModule(moduleId).then((status) => {
      dispatch(deleteModule(moduleId));
    });
  };

  const handleUpdateModule = async () => {
    const status = await client.updateModule(module);
    dispatch(updateModule(module));
  };



  useEffect(() => {
    client.findModulesForCourse(courseId)
      .then((modules) =>
        dispatch(setModules(modules))
    );
  }, [courseId]);

  const moduleList = useSelector((state: KanbasState) => state.modulesReducer.modules);
  const module = useSelector((state: KanbasState) => state.modulesReducer.module) as Module;
  const modulesList = moduleList.filter((module) => module.course === courseId);
  const [isAddingModule, setIsAddingModule] = useState(false);
  const [expandedModules, setExpandedModules] = useState(new Set());
  const handleCollapseAll = () => {
    setExpandedModules(new Set()); // clear the epandedModules Set
    setIsCollapsed(true);
  }
  const handleExpandAll = () => {
    setExpandedModules(new Set(modulesList.map((module) => module._id))); // add all module IDs to the expandedModules Set
    setIsCollapsed(false); // set isCollapsed to false
  };
  const handleAddModule = () => {
    client.createModule(courseId, module).then((module: Module) => {
      dispatch(addModule(module));
    });
  };

  
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selectedModule, setSelectedModule] = useState(modulesList[0]);
  const handleModuleClick = (module: any) => {
    setExpandedModules((prevExpandedModules) => {
      const isExpanded = prevExpandedModules.has(module._id);
      const newExpandedModules = new Set(prevExpandedModules);
      if (isExpanded) {
        newExpandedModules.delete(module._id);
      } else {
        newExpandedModules.add(module._id);
      }
      return newExpandedModules;
    });
  };

  const dispatch = useDispatch();
  return (

    <div className="row d-block center">
      <br />
      <div className="col btn-group-row">
        {/* Converted buttons and select dropdown */}
        <button className="btn-flat" type="button" onClick={isCollapsed ? handleExpandAll : handleCollapseAll}>{isCollapsed ? "Expand All" : "Collapse All"}</button>
        <button className="btn-flat" type="button">View Progress</button>
        <div className="dropdown-container">
          <select className="dropdown-flat">
            <option>Publish All</option>
            <option>Publish All Modules and Items</option>
            <option>Publish Modules only</option>
            <option>UnPublish All Modules</option>
          </select>
          <RxTriangleDown size={13} className="me-2 expand-icon stretched-icon dropdown-icon" />
        </div>
        <button onClick={() => setIsAddingModule(prev => !prev)} className="btn-module-add " type="button">+ Module</button>
        <button className="btn-flat" id="ellipsis-icon">
          <PiDotsThreeVerticalBold size={20} className="ellipsis-icon" type="button" />
        </button>
      </div>
      <br />


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
                    onClick={handleAddModule}
                    type="button"
                    className="btn btn-success"
                  >
                    Add
                  </button>
                  <button onClick={handleUpdateModule} type="button" className="btn btn-primary">
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
                onClick={() => handleModuleClick(module)}>

                <div className="module-header-container" >
                  <PiDotsSixVerticalBold size={20} className="me-1 ellipsis-icon" />
                  {expandedModules.has(module._id) ? (
                    <RxTriangleDown size={13} className="me-2 expand-icon stretched-icon" />
                  ) : (
                    <RxTriangleRight size={13} className="me-2 expand-icon stretched-icon" />
                  )}
                  {module.name}

                  <button
                    onClick={() => handleDeleteModule(module._id)} type="button" className="btn-flat me-2 ms-4" id="delete">
                    Delete
                  </button>

                  <button
                    onClick={() => dispatch(setModule(module))} type="button" className="btn-flat" id="edit">
                    Edit
                  </button>

                  <span
                    className="module-icons float-end">
                    <FaCheckCircle className="icon module-icons text-success" />
                    <FaPlusCircle className="icon module-icons ms-2 me-3" />
                    <PiDotsThreeVerticalBold size={20} className="me-1 module-icons ellipsis-icon" />

                  </span>

                </div>
                {expandedModules.has(module._id) && (
                  <ul className="list-group">
                    {module.lessons?.map((lesson: { name: string }, index: number) => (
                      <li className="list-group-item-inner" key={index}>
                        <PiDotsSixVerticalBold size={20} className="me-1 ellipsis-icon" />
                        {lesson.name}
                        <span className="float-end">
                          <FaCheckCircle className="text-success" />
                          <PiDotsThreeVerticalBold size={20} className="me-1 ellipsis-icon" />
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