const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const FRONTEND_DIR = path.join(__dirname, 'frontend');

const server = http.createServer((req, res) => {
  let filePath = path.join(FRONTEND_DIR, req.url === '/' ? 'index.html' : req.url);
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 - File Not Found</h1>');
      return;
    }
    
    const ext = path.extname(filePath);
    let contentType = 'text/html';
    if (ext === '.css') contentType = 'text/css';
    if (ext === '.js') contentType = 'text/javascript';
    if (ext === '.png') contentType = 'image/png';
    if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
    if (ext === '.gif') contentType = 'image/gif';
    if (ext === '.svg') contentType = 'image/svg+xml';
    if (ext === '.json') contentType = 'application/json';
    
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Frontend server running on http://localhost:${PORT}`);
  console.log(`Serving files from: ${FRONTEND_DIR}`);
});
