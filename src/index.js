const http = require('http');
const { bodyParser } = require('./lib/bodyParser');

let database = [];

function getTaskHandler(req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(database));
  res.end();
}

async function createTaskHandler(req, res) {
  try {
    await bodyParser(req);
    database.push(req.body);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(database));
    res.end();
  } catch (error) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write('Invalid Data');
    res.end();
  }
}
//This is a comment
async function updateTaskHandler(req, res) {
  let { url } = req;
  let idQuery = url.split('?')[1];
  let idKey = idQuery.split('=')[0];
  let idValue = idQuery.split('=')[1];
//This is a comment too
  if (idKey === 'id') {
    await bodyParser(req);
    database[idValue - 1] = req.body;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(database));
    res.end();
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write(JSON.stringify({ message: 'Invalid request query' }));
    res.end();
  }
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
    case 'PUT':
      updateTaskHandler(req, res);
  }
});
server.listen(3000);
console.log('Server on port', 3000);
