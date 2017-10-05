var OSC_RECIEVE_PORT = 6448
var WS_PORT          = 4244
var osc              = require('node-osc');
var express          = require('express');
const WebSocket      = require('ws');
var app              = express();
var open_sockets     = [];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.use(express.static('public'));

/* handles web socket connections and outgoing osc messages*/
const wss = new WebSocket.Server({ port: WS_PORT });
  console.log('listening for WEBSOCKET connections on *:'+ WS_PORT);
  wss.on('connection', function connection(ws) {
      console.log('a user connected');
      open_sockets.push(ws);        
      ws.on('message', function incoming(message) {
            console.log('received: %s', message);
            var msgObj = JSON.parse(message);
            var msg  = msgObj["msg"]; 
            var addr = msgObj["addr"]; 
            var ip   = msgObj["ip"]; 
            var port = parseInt(msgObj["port"]); 
            var client = new osc.Client(ip, port);
            client.send(addr, msg, function () {
              client.kill();
            });         
      });
      ws.send('something');
  });

/* handles incoming osc messages*/
var oscServer = new osc.Server(OSC_RECIEVE_PORT, '0.0.0.0');
console.log('listening for OSC packets on *:'+OSC_RECIEVE_PORT);
oscServer.on("message", function (msg, rinfo) {
      console.log("OSC message received:");
      console.log(msg);
      open_sockets.forEach(function(socket){
            socket.emit("osc", {'address':msg[0], 'payload':msg.slice(1)});
      })
});

