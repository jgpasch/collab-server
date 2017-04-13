import fs from 'fs';

export default function (socket) {
  socket.on('connection', (thisSocket) => {
    console.log(`new connection from ${thisSocket.request.connection.remoteAddress}`);

    thisSocket.on('join', (data) => {
      fs.readFile(`./uploads/${data.file_uuid}.javascript`, 'utf-8', (err, fileContents) => {
        console.log('file found');
        // console.log(fileContents);
        thisSocket.emit('fileContents', { fileContents });
      });
    });
  });
}
