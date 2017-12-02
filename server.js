// Start Project:
// Run two commands in different terminal windows:
// In project directory:
// npm run start
// In directory with ngrok executable:
// ./ngrok http 3000 -> Opens connection with localhost:3000

var express = require('express');

var app = express();
var server = app.listen(3000);

app.use(express.static('public'));

console.log("Server is running");

var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection', newConnection);

var cs = [];

function newConnection(socket) {
  console.log(socket.id);

  socket.emit('currentState', cs);

  socket.on('mouseEvent', mouseMsg);

  function mouseMsg(data) {
    console.log(data);
    cs.push(data);
    socket.broadcast.emit('syncDrawing', data);
  }
}
