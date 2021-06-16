import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();

const server = http.createServer(app);
const io = new Server(server);

io.sockets.on('connection', function (socket) {
  socket.on('join', function (data) {
    console.log('socket connecting with ' + data.from);
    socket.join(data.from); // We are using room of socket io
  });

  socket.on('message', (data) => {
    console.log(data);
    io.sockets
      .in(data.to)
      .emit('message', { from: data.from, to: data.to, msg: data.msg });
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
