import React from "react";
import HelloRedux from "./HelloRedux";
import CounterRedux from "./CounterRedux";
import AddRedux from "./AddRedux";
import TodoList from "./todos/TodoList";
import TodoForm from "./todos/TodoForm";

const ReduxExamples = () => {
  return(
    <div>
      <h2>Redux Examples</h2>
      <TodoList/>
      <TodoForm/>

      <HelloRedux/>
      <br/>
      <CounterRedux/>
      <br/>
      <AddRedux/>
    </div>
  );
};

export default ReduxExamples;