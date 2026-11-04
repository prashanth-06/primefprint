const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;
const baseDir = 'c:\\Users\\lapto\\Documents\\antigravity\\keen-hypatia\\forensic_landing_pages';

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/' || reqPath === '') reqPath = '/landing_slider.html';
  const filePath = path.join(baseDir, reqPath);
  
  if (fs.existsSync(filePath)) {
    const ext = path.extname(filePath);
    let contentType = 'text/html';
    if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
    if (ext === '.png') contentType = 'image/png';
    if (ext === '.css') contentType = 'text/css';
    if (ext === '.js') contentType = 'text/javascript';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(port, () => {
  console.log(`Local web server running on http://localhost:${port}/landing_slider.html`);
});
