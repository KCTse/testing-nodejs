var express = require('express'),
      app = express(),
      server = require('http').createServer(app),
      io = require('socket.io').listen(server);

var users = {};

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
    data = data.trim().split(/^(\/w)\s([^\s]*)\s(.+)/).filter(Boolean);
    if(data[0] == '/w'){
      if(data[1] in users){
        users[data[1]].emit('new message', {'user': socket.username, 'msg': data[2]+' <i style="font-size:9px;">--whisper from '+socket.username+'</i>'});
        users[socket.username].emit('new message', {'user': socket.username, 'msg': data[2]+' <i style="font-size:9px;">--whisper to '+data[1]+'</i>'});
      }
      else{
        console.log('no such user" "'+data[1]+'"');
      }
    }
    else{
      io.sockets.emit('new message', {'user': socket.username, 'msg': data});
    }
  });

  // username is emitted
  socket.on('new user', function(data, callback){
    if (data in users){
      callback(false); // username has been used
    }
    else{
      callback(true);
      socket.username = data;
      users[socket.username] = socket;
      updateUsers();
    }
  });

  // discconnect
  socket.on('disconnect', function(){
    if(!socket.username) return; // the case that user disconnect without entering the name
    delete users[socket.username];
    updateUsers();
  });

  // update user online list
  function updateUsers(){
    io.sockets.emit('user online', Object.keys(users));
  }
});