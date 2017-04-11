import HttpDispatcher from 'httpdispatcher';
import fs from 'fs';

const dispatcher = new HttpDispatcher();

function handleRequest(req, res) {
  try {
    console.log(req.url);
    dispatcher.dispatch(req, res);
  } catch (err) {
    console.log(err);
  }
}

dispatcher.onGet('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end('hello world');
});

dispatcher.onPost('/files/create', (req, res) => {
  console.log('here i am');
  const timestamp = new Date().getTime();
  const jsonBody = JSON.parse(req.body);
  fs.writeFile(`./uploads/${timestamp}`, jsonBody.fileContents, 'utf-8', (err) => {
    res.writeHead(200, { 'Content-Type': 'plain/text' });
    console.log('am i here');
    res.end(JSON.stringify({ fileUUID: timestamp }));
    console.log('am i here');
  });
});

export default handleRequest;
