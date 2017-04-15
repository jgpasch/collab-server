import fs from 'fs';

export default function (socket) {
  socket.on('connection', (thisSocket) => {
    console.log(`new connection from ${thisSocket.request.connection.remoteAddress}`);

    thisSocket.on('join', (data) => {
      console.log(data);
      console.log('looking for file ', data.file_uuid);
      fs.readFile(`./uploads/${data.file_uuid}`, 'utf-8', (err, file_contents) => {
        if (err) {
          console.log(err);
        }
        console.log('file found');
        console.log(file_contents);
        thisSocket.emit('file_received', { file_contents });
      });
    });
  });
}
