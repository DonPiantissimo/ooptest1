var
	gameport = process.env.PORT || 4004,
	io = require('socket.io'),
	express = require('express'),
	UUID = require('node-uuid'),
	http = require('http'),
	app = express(),
	server = http.createServer(app);

server.listen(gameport);



app.get('/', function(req,res){
res.sendFile('/index.html',{root:__dirname});
});

app.get('/*', function(req,res,next){
res.sendFile(__dirname + '/' + req.params[0]);
});

var sio = io.listen(server);


   sio.configure(function () {

    sio.set('log level', 0);

    sio.set('authorization', function (handshakeData, callback) {
        callback(null, true); // error first callback style
    });

});


//require('./game.logic.js');

sio.sockets.on('connection', function(client){
    client.userid = UUID();
    client.emit('onconnected', {id:client.userid});
    console.log('connected');
    var message = [];
    client.on('message', function(m){
	    message = m.split('-');
        console.log(Date.now()-parseFloat(message[1]));
    });
});
