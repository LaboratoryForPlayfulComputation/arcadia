var OSC_RECIEVE_PORT = 6448
var WS_PORT=4243

var osc = require('node-osc');

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var open_sockets = [];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static('public'));


io.on('connection', function(socket){
  console.log('a user connected');
  open_sockets.push(socket);
  socket.on('disconnect', function(){
        //remove this socket from our list of open sockets
        open_sockets = open_sockets.filter(function(item){
              return item != socket;
        });
  });
});

http.listen(WS_PORT, function(){
  console.log('listening for WEBSOCKET connections on *:'+WS_PORT);
});

var oscServer = new osc.Server(OSC_RECIEVE_PORT, '0.0.0.0');
console.log('listening for OSC packets on *:'+OSC_RECIEVE_PORT);
oscServer.on("message", function (msg, rinfo) {
      console.log("OSC message received:");
      console.log(msg);
      open_sockets.forEach(function(socket){
            socket.emit("osc", {'address':msg[0], 'payload':msg.slice(1)});
      })
});