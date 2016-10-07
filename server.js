var path = require('path');

var http = require('http');
var server = http.createServer();

var express = require('express');
var app = express();

var socketio = require("socket.io");


server.on('request', app);

var io = socketio(server);  // Make sure this is after server.on to insure that Express runs firt for typical HTTP requests

io.on("connection", function (socket) {
  console.log("A new client has connected!");
  console.log(socket.id)

  socket.on("disconnect", function(){
    console.log("Client has DISconnected!  =(");
    console.log(socket.id)
  })

  socket.on("sentData", function(start, end, strokeColor) {
    console.log(start, end, strokeColor);
    // whiteboard.draw(start, end, strokeColor, 1);
    socket.broadcast.emit("broadcastData", start, end, strokeColor);

  })

});



server.listen(1337, function () {
    console.log('The server is listening on port 1337!');
});

app.use(express.static(path.join(__dirname, 'browser')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
