import VariablesAndConstants from "./variables/VariablesAndConstant";
import VariableTypes from "./variables/VariableTypes";
import BooleanVariables from "./variables/BooleanVariables";
import IfElse from "./conditionals/IfElse";
import TernaryOpertor from "./conditionals/TernaryOperator";
import ES5Functions from "./functions/ES5Functions";
import ArrowFunctions from "./functions/ArrowFunctions";
import ImpliedReturn from "./functions/ImpliedReturn";
import FunctionParenthesisAndParameters from "./functions/FunctionParenthesisAndParameters";
import WorkingWithArrays from "./arrays/WorkingWithArrays";
import ArrayIndexAndLength from "./arrays/ArrayIndexAndLength";
import AddingAndRemovingDataToFromArrays from "./arrays/AddingAndRemovingDataToFromArrays";
import ForLoops from "./arrays/ForLoops";
import MapFunction from "./arrays/MapFunction";
import JsonStringify from "./json/JsonStringify";
import FindFunction from "./arrays/FindFunction";
import FindIndex from "./arrays/FindIndex";
import FilterFunction from "./arrays/FilterFunction";
import TemplateLiterals from "./string/TemplateLiterals";
import House from "./json/House";
import Spreading from "./json/Spreading";
import Destructing from "./json/Destructing";
import FunctionDestructing from "./json/FunctionDestructing";


function JavaScript() { 
  console.log('Hello World!');

    return(
    <div> 
      <h1>JavaScript</h1>
      <VariablesAndConstants/>
      <VariableTypes/>
      <BooleanVariables/>
      <IfElse/>
      <TernaryOpertor/>

      <ES5Functions/>
      <ArrowFunctions/>
      <ImpliedReturn/>
      <FunctionParenthesisAndParameters/> <br/>

      <h2>Arrays:</h2>
      <WorkingWithArrays/>
      <ArrayIndexAndLength/>
      <AddingAndRemovingDataToFromArrays/>
      <ForLoops/>
      <MapFunction/> 
      <FindFunction/>
      <FindIndex/>
      <FilterFunction/> 
      <br/>

      <h2>JavaScript Object Notation(JSON):</h2>
      <JsonStringify/> 
      <House/>
      <Spreading/>
      <Destructing/> <br/>
      <FunctionDestructing/>

      <h2>String:</h2>
      <TemplateLiterals/>

    </div> 
    );
  }
  export default JavaScript