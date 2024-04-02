import React from 'react';
import Labs from './Labs';
import HelloWorld from "./Labs/a3/HelloWorld";
import Kanbas from "./Kanbas"
import './App.css';
import { HashRouter } from 'react-router-dom';
import {Routes, Route, Navigate} from "react-router";


function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          {/* We can declare the Lab component as the default landing page like this */}
          <Route path="/" element={<Navigate to="/Kanbas"/>}/>
          
          <Route path="/Labs/*" element={<Labs/>}/>
          <Route path="/Kanbas/*" element={<Kanbas/>}/>
          <Route path="/hello" element={<HelloWorld/>}/>
            
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
