import { Link } from "react-router-dom";
import ModuleList from "../Modules/List";
import Status from "./Status";
import "./index.css";

function Home() {
  return (
    <div className="home-container">
      <div className="module-list-container">
          <ModuleList />
        </div>
        <div className="status-container">
          <Status />
        </div>
    </div>
  );
}
export default Home;