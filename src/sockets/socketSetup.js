import fs from 'fs';

export default function (socket) {
  socket.on('connection', (thisSocket) => {
    console.log(`new connection from ${thisSocket.request.connection.remoteAddress}`);

    thisSocket.on('join', (data) => {
      fs.readFile(`./uploads/${data.file_uuid}`, 'utf-8', (err, fileContents) => {
        thisSocket.emit('fileContents', { fileContents });
      });
    });
  });
}
