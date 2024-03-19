function ClickEvent() {    // declare a function to handle the event
  const hello = () => {
    alert("Hello World!");
  };
  const lifeIs = (good: string) => {
    alert(`Life is ${good}`);
  };
  return (
    <div>
      <h2>Click Event</h2> 
      <button onClick={hello}> 
        Click Hello</button>
      <button onClick={() => lifeIs("Good!")}> 
        Click Good</button>
      <button
        onClick={() => {    // wrap in {} if you need more than one line of code
          hello();          // calling hello()
          lifeIs("Great!"); // calling lifeIs()
        }}
      >
        Click Hello 3
      </button>
    </div>
  );
}
export default ClickEvent;