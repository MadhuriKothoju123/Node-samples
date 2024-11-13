const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    if (req.url === '/') {
        res.write('Welcome to the Home Page!');
    } else if (req.url === '/about') {
        res.write('Welcome to the About Page!');
    } else {
        res.writeHead(404);
        res.write('404 Not Found');
    }
    res.end();
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
