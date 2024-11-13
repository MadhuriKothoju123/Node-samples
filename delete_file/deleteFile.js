const fs = require('fs');
const filePath = 'E:/DemoFiles/deleteFile1.html'; 


// Create the file
fs.writeFile(filePath, 'Hello, world!', (err) => {
  if (err) {
    console.error('Error creating file:', err);
    return;
  }
  console.log('File created successfully!');

  // Delete the file after creation
//   fs.unlink(filePath, (err) => {
//     if (err) {
//       console.error('Error deleting file:', err);
//     } else {
//       console.log('File deleted successfully!');
//     }
//   });
});
