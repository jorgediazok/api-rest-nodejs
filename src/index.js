const http = require('http');

let database = [];

function getTaskHandler(req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(database));
  res.end();
}

function createTaskHandler(req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write('Post request received');
  res.end();
}

const server = http.createServer((req, res) => {
  const { url, method } = req;
  console.log(`URL: ${url} - Method: ${method}`);
  switch (method) {
    case 'GET':
      if (url === '/') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ message: 'Hello World' }));
        res.end();
      }
      if (url === '/tasks') {
        getTaskHandler(req, res);
      }
    case 'POST':
      if (url === '/tasks') {
        createTaskHandler(req, res);
      }
  }
});
server.listen(3000);
console.log('Server on port', 3000);
