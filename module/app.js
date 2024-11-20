var url = require('url');

const calculator = require('./calculator');

try {
  const a = 10;
  const b = 5;

  console.log(`Add: ${a} + ${b} = ${calculator.add(a, b)}`); // Output: Add: 10 + 5 = 15
  console.log(`Subtract: ${a} - ${b} = ${calculator.subtract(a, b)}`); // Output: Subtract: 10 - 5 = 5
  console.log(`Multiply: ${a} * ${b} = ${calculator.multiply(a, b)}`); // Output: Multiply: 10 * 5 = 50
  console.log(`Divide: ${a} / ${b} = ${calculator.divide(a, b)}`); // Output: Divide: 10 / 5 = 2
} catch (error) {
  console.error('Error:', error.message);
}

var adr = 'http://localhost:8080/default.htm?year=2017&month=february';
var q = url.parse(adr, true);

console.log(q.host); //returns 'localhost:8080'
console.log(q.pathname); //returns '/default.htm'
console.log(q.search); //returns '?year=2017&month=february'

var qdata = q.query; //returns an object: { year: 2017, month: 'february' }
console.log(qdata.month); //returns 'february'
