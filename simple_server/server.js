// app.js

const http = require('http');
const url = require('url');
const { addUser, getUsers, deleteUser } = require('./userModule');

// Create an HTTP server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  res.setHeader('Content-Type', 'application/json');

  // Add a user (POST request)
  if (req.method === 'POST' && pathname === '/addUser') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      const { name, age } = JSON.parse(body);
      const user = addUser(name, age);
      res.statusCode = 201;
      res.end(JSON.stringify({ message: "User added", user }));
    });
  }

  else if (req.method === 'GET' && pathname === '/getUsers') {
    const users = getUsers();
    res.statusCode = 200;
    res.end(JSON.stringify(users));
  }

  else if (req.method === 'DELETE' && pathname === '/deleteUser') {
    const { id } = query;
    const user = deleteUser(Number(id));
    if (user) {
      res.statusCode = 200;
      res.end(JSON.stringify({ message: "User deleted", user }));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: "User not found" }));
    }
  }

  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

// Set the server to listen on a specific port
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
