var express = require('express'),
      app = express(),
      server = require('http').createServer(app),
      io = require('socket.io').listen(server);

var users = [];

server.listen(3000, function(){
  console.log('listening to port '+server.address().port);
});

app.get('/', function(req, res){
  res.sendFile(__dirname+'/index.html');
});

/* Starting method of socket.io */
io.sockets.on('connection', function(socket){
  // message is emitted
  socket.on('message', function(data){
    io.sockets.emit('new message', {'user': socket.username, 'msg': data});
  });

  // username is emitted
  socket.on('new user', function(data, callback){
    if (users.indexOf(data) != -1){
      callback(false); // username has been used
    }
    else{
      callback(true);
      socket.username = data;
      users.push(socket.username);
      updateUsers();
    }
  });

  // discconnect
  socket.on('disconnect', function(){
    if(!socket.username) return; // the case that user disconnect without entering the name
    users.splice(users.indexOf(socket.username), 1);
    updateUsers();
  });

  // update user online list
  function updateUsers(){
    io.sockets.emit('user online', users);
  }
});