var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
  const filePath = 'E:/DemoFiles/demofile1.html'; 

  fs.readFile(filePath, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.write('404 Not Found');
      return res.end();
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });

  fs.appendFile(filePath, '<p>appending file</p>', function (err) {
    if (err) throw err;
    console.log(' appending done!');
  });
  
// fs.writeFile(filePath, '<b>Hello, world!</b>', function(err) {
//   if (err) throw err;
//   console.log('File was written successfully!');
// });
}).listen(8080);





console.log('Server is running at http://localhost:8080/');

