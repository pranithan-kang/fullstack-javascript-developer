
let fullname = "John"; // "John"
let age = 10;

// console.log('Name: ' + fullname + ' age: ' + age.toString());
// console.log('Name: ' + fullname + ' age: ' + age.toString());
console.log(`Name: ${fullname} age: ${age}`);

let user = {
  id: 1,
  username: "admin",
  isAdmin: true,
  address: {
    province: "Bangkok",
  },
};

console.log(`username: ${user.username}`);
console.log(`isAdmin: ${user.isAdmin}`);

// const ttt = "testing";
// ttt = 10;

/**
 * const is restrict to change the reference/primitive only
 */
const USER = {
  id: 2,
  username: "normal-user",
  isAdmin: false,
  address: {
    province: "Nontaburi",
  },
};

USER.username = "changed-user";

let test = "test-string";
test[1] = "test-string-2";

console.log(test[1]);
