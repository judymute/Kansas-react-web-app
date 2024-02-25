import { Link } from "react-router-dom";
import ModuleList from "../Modules/List";
import Status from "./Status";
import "./index.css";

function Home() {
  return (
    <div>
      <div className="not-right-side d-flex">
        <ModuleList />
        <Status />

      </div>
    </div>
  );
}
export default Home;