var socket = io();

function setup() {
    socket.on('osc', function(msg){
        var osc_address = msg["address"];
        var osc_values = msg["payload"];
        //do something with your new data here
    });
}

function draw() {
  
}