// var spawn = require('child_process').spawn;
// var net = require('net');

// if(process.argv[2] === 'child') {
//   setInterval(function(){
//     console.log('im child with id: ', process.pid);
//   }, 2000);
// }
// else {
//   var child = spawn(process.execPath, [__filename, 'child']);
//   child.stdout.pipe(process.stdout);

//   setInterval(function(){
//     console.log('im parent with id: ', process.pid);
//   }, 1000);
// }

// process.stdin.on('readable', function(){
//    var chunk = process.stdin.read();
//   if (chunk !== null) {
//     process.stdout.write(`data: ${chunk}`);
//   }
// });

// process.stdin.on('end', () => {
//   process.stdout.write('end');
//   process.exit();
// });

// var server = net.createServer(function(socket){
//   socket.end('goobye\n');
// });


// server.listen({
//     host: 'localhost',
//     port: '3000'
//   },
//   function(){
//     console.log(server.address());
// });

// var express = require('express'), app = express();
// var user = 0;

// app.listen(3000, function(err){
//   if(err) throw err;
//   console.log('listening to port 3000');
// });
// app.get('/', function(req, res){
//   saySomething(user);
//   user++;
//   res.send('end');
// });

// function saySomething(user){
//   setInterval(function(){
//     console.log('im user #'+user);
//   }, 1000);
// }

var str = '/w jacky dont let the prof know this';
console.log(str.split(/^(\/w)\s([^\s]*)\s(.+)/).filter(Boolean));