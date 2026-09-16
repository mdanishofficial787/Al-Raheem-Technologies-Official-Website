const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const FRONTEND_DIR = path.join(__dirname, 'frontend');

const server = http.createServer((req, res) => {
  const requestPath = decodeURIComponent(req.url.split('?')[0]);
  const relativePath = requestPath === '/' ? 'index.html' : requestPath.replace(/^[/\\]+/, '');
  const filePath = path.resolve(FRONTEND_DIR, relativePath);

  if (!filePath.startsWith(`${FRONTEND_DIR}${path.sep}`)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }
  
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
    if (ext === '.ico') contentType = 'image/x-icon';
    if (ext === '.webp') contentType = 'image/webp';
    if (ext === '.mp4') contentType = 'video/mp4';
    
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Frontend server running on http://localhost:${PORT}`);
  console.log(`Serving files from: ${FRONTEND_DIR}`);
});
