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

var tmp = {a: 'something', b: 'another thing'};
console.log(tmp);
console.log('a' in tmp);
console.log('c' in tmp);