const fs = require('fs');
const filePath = 'E:/DemoFiles/IOBlocking.txt'; 

try {
  const data = fs.readFileSync(filePath, 'utf-8');
  console.log(data);
} catch (err) {
  console.error(err);
}
console.log('File read operation completed.');


// The concept of the event-driven model in Node.js means that the execution flow of a program is largely 
// determined by events and responses to these events. Node.js uses this model to handle multiple tasks concurrently by 
// listening for events (such as network requests or file operations)
//  and executing callback functions when these events occur,
//   rather than blocking and waiting for each task to complete in sequence.

// Asynchronously reading a file
fs.readFile(filePath, 'utf-8', (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log(data);
  }
});
console.log('File read operation started.');
