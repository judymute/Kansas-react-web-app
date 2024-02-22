function FunctionParenthesisAndParameters() {
  const square = (a: number) => a * a; 
  const plusOne = (a: number) => a + 1; 
  const twoSquared = square(2);
  const threePlusOne = plusOne(3);
  return (
    <>
    <h3>Parenthesis and Parameters</h3>
    twoSquared = { twoSquared }<br />
    {/* text:   expression: */}
    square(2) = { square(2) }<br />
    threePlusOne = { threePlusOne }<br />
    {/* text:   expression: */}
    plusOne(1) = { plusOne(1) }<br />
    </>
  );
}

export default FunctionParenthesisAndParameters