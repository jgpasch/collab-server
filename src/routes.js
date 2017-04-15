import HttpDispatcher from 'httpdispatcher';
import pathRegexp from 'path-to-regexp';
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

const keys = [];
const re = pathRegexp('/files/:id', keys);

dispatcher.onGet(re, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  // TODO fs.readFile with lang extension
  res.end(JSON.stringify({ data: 'really?' }));
});

dispatcher.onPost('/create', (req, res) => {
  console.log('here i am');
  const timestamp = new Date().getTime();
  const jsonBody = JSON.parse(req.body);
  // console.log(jsonBody.file_contents);
  fs.writeFile(`./uploads/${timestamp}`, jsonBody.file_contents, 'utf-8', (err) => {
    res.writeHead(200, { 'Content-Type': 'plain/text' });
    console.log(`new file id is ${timestamp}`);
    res.end(JSON.stringify({ file_uuid: timestamp }));
  });
});

export default handleRequest;
