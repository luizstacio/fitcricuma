// Setup basic express server
'use strict';

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;
var five = require('johnny-five');
var board = new five.Board();

board.on('ready', function() {
  var led13 = new five.Led(13);
  var ativo = led13.value;

  server.listen(port, function () {
    console.log('Server listening at port %d', port);
  }); 

  app.use(express.static(__dirname + '/public'));

  io.on('connection', function (socket) {

    console.log('conectado');
    socket.emit('ch1', {
      ativo: ativo
    });

    socket.broadcast.on('ch1', function (data) {
      led13.toggle();
      ativo = led13.value;
      socket.broadcast.emit('ch1', {
        ativo: ativo
      });
      socket.emit('ch1', {
        ativo: ativo
      });
    });
  });

});
