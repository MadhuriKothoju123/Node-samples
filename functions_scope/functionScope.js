// Global scope variable
global.appName = "Node Scope Example";
//module Scope
let counter = 0;
CO

function incrementCounter() {
  counter += 1;
  console.log(`Counter: ${counter}`);
}

// Function to create a closure
function createCounter() {
  let count = 0; // Function-scoped variable

  return function() {
    count += 1; // Closure, keeps `count` from outer scope
    return count;
  };
}

const myCounter = createCounter();
console.log(myCounter()); 
console.log(myCounter()); 

// Block-scoped variable
if (true) {
  let message = "Block Scoped!";
  console.log(message); // Accessible here
}

// Arrow function for handling `this` context
const user = {
  name: "Alice",
  greet: function() {
    const arrowFunc = () => {
      console.log(`Hello, ${this.name}`);
    };
    arrowFunc();
  }
};

user.greet(); 
incrementCounter(); 
// Global Scope: appName is accessible anywhere in the module.
// Module Scope: counter is accessible only within this module unless exported.
// Function Scope: count is scoped to createCounter, and each call to myCounter uses the same count due to closure.
// Block Scope: message is only accessible inside the if block.
// Arrow Functions and this: arrowFunc in user.greet inherits this from user.

function outer() {
  let name = "Alice"; // Lexical scope: `name` is available here

  return function inner() {
      console.log(name); // Closure: `name` is captured by `inner`
  };
}

const innerFunction = outer(); // `outer` is executed, and `name` is defined
innerFunction(); // Output: Alice (closure allows access to `name`)

