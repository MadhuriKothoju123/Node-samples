const fs = require('fs');

const filePath = 'E:/DemoFiles/demofile1.html'; 

const flags = 'w'; 
const mode = 0o600; 

fs.open(filePath, flags, mode, (err, fd) => {
  if (err) {
    console.error('Error opening file:', err);
    return;
  }

  console.log('File opened successfully with mode 0o600');

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
