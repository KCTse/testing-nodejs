var express = require('express'),
      app = express(),
      server = require('http').createServer(app),
      io = require('socket.io').listen(server),
      bodyParser = require('body-parser'),
      util = require('util');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

server.listen(3000, function(){
  console.log('listening to port '+server.address().port);
});

app.get('/', function(req, res){
  res.sendFile(__dirname+'/index.html');
});

app.post('*', function(req, res){
  console.log(`> POST\nHeaders:\n${util.inspect(req.headers, {showHidden:true, depth: null})}\nurl: ${req.url}\nmethod: ${req.method}\nbody: ${util.inspect(req.body, {showHidden:true, depth:null})}`);
})

io.sockets.on('connection', function(socket){
  socket.on('message', function(data){
    io.sockets.emit('new message', data);
  })
});