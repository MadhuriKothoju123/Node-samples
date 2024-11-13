const fs = require('fs');

const filePath = 'E:/DemoFiles/demofile1.html'; 

const flags = 'w'; // Open file for writing
const mode = 0o600; // Owner can read and write; no access for others

fs.open(filePath, flags, mode, (err, fd) => {
  if (err) {
    console.error('Error opening file:', err);
    return;
  }

  console.log('File opened successfully with mode 0o600');

  // Now you can write to the file using the file descriptor
  const data = '<b>This file has restricted permissions.</b>';

  fs.write(fd, data, (writeErr) => {
    if (writeErr) {
      console.error('Error writing to file:', writeErr);
    } else {
      console.log('Data written successfully');
    }

    // Always close the file descriptor after use
    fs.close(fd, (closeErr) => {
      if (closeErr) {
        console.error('Error closing file:', closeErr);
      } else {
        console.log('File closed successfully');
      }
    });
  });
});
