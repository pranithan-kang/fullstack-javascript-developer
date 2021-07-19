/**
 * Function
 */
function showMsg() {
  console.log("Hello function");
}
showMsg();

function getSum(a, b) {
  return a + b;
}
console.log(getSum(10, 5));

const showMsg2 = () => console.log("Hello arrow function");
showMsg2();

const getSum2 = (a, b) => a + b;
console.log(getSum2(10, 4));

/**
 * Default arguments
 * - new thing in ES6
 */
function f(a, b = "default", c = 3) {
  return `${a} - ${b} - ${c}`;
}
console.log(f(5, 6, 7));
console.log(f(5, 6));
console.log(f(5));
console.log(f());
