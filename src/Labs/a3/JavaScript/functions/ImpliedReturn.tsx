function ImpliedReturn() {
  const multiply = (a: number, b: number) => a * b; const fourTimesFive = multiply(4, 5); console.log(fourTimesFive);
  return (
    <>
    <h3>Implied Return</h3>
    fourTimesFive = { fourTimesFive }<br />
    {/* text:   expression: */}
    multiply(4, 5) = { multiply(4, 5) }<br />
    </>

  );
}

export default ImpliedReturn