var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http)

app.get('/', function(req, res) {
  // res.send('<h1>Hello Socket.Io</h1>');
  res.sendFile(__dirname + '/index.html');
})

io.on('connection', function(socket) {
	socket.on('message', function(msg){
    io.emit('message', msg);
  })

	// socket.on('disconnect', function() {
	// 	console.log('someone out...')
	// })
})

http.listen(3000, function() {
  console.log('server is running at http://127.0.0.1:3000');
})

