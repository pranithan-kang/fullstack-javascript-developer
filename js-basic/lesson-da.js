
/**
 *  Destructuring-assignment
 */

let user = {
  id: 1,
  username: "admin",
  isAdmin: true,
  address: {
    province: "Bangkok",
  },
};

"use strict";
const { id, testWrong } = user;
console.log(testWrong);

// const { id, name, address: { province } } = user;
// console.log(address); // ReferenceError: address is not defined

// const { id, name, address: { province }, address } = user;
// console.log(id, province, address);

let arr = [1, 2, 3, 4, 5];
const [first, second, third, ...rest] = arr;
console.log(first, second, third, rest);

/**
 *  Destructuring-arguments
 */
let score = { a: 10, b: 20, c: 30 };
const sumScore = (score) => {
  let { a, b, c } = score;
  return a + b + c;
};
console.log(sumScore(score));

const sumScoreDeArg = ({ a, b, c }) => a + b + c;
console.log(sumScoreDeArg(score));

/**
 * Spread operator
 */
const u1 = { name: "john", isShow: true };
const u2 = { name: "mary" };
const u3 = { ...u1, ...u2 };

/**
 * Rest parameter
 */
function sum(...args) {
  return args.reduce((prv, cur)=> prv + cur);
}
console.log(sum(1, 2, 3, 4, 5));