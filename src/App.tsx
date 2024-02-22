import React from 'react';
import logo from './logo.svg';
import Labs from './Labs';
import HelloWorld from "./Labs/a3/HelloWorld";
import Kanbas from "./Kanbas"
import './App.css';

function App() {
  return (
    // return can only return a single component that's why we wrap the whole content with a <div>
    <div>
      <Labs/>
      <Kanbas/>
      <HelloWorld/>
      {/* <h1>Hello World!</h1> */}
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
