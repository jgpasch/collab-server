import express from 'express';
import socketIO from 'socket.io';
import bodyParser from 'body-parser';
import http from 'http';

import handleRequest from './routes';
import socketSetup from './sockets/socketSetup';
import serverSettings from '../config/server';

const app = express();
app.use(bodyParser.json());

const server = http.createServer(handleRequest);

const socketIOInstance = socketIO(server);

socketSetup(socketIOInstance);

server.listen(serverSettings.port, () => {
  console.log(`server listening on port ${serverSettings.port}`);
});
