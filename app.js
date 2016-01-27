const http = require('http');
var querystring = require('querystring');

const hostname = '127.0.0.1';
const port = 1337;

var server = http.createServer(function(req, res){
	console.log(`METHOD: ${req.method} `);
	//console.log(`BODY: ${req}\n`);
	req.on('data', function(chunk){
		console.log(`BODY: ${chunk}`);
	});

	res.writeHead(200, { 'Content-Type': 'text/plain' });
  	res.end('Hello There\n');
});
server.listen(port, hostname, function(){
	console.log(`Server running at http://${hostname}:${port}/`);
});

var postData = querystring.stringify({
	'msg' : 'this is a POST request'
});

var option = {
	hostname : '127.0.0.1',
	port : 1337,
	path : '',
	method : 'POST',
	headers : {
		'Content-Type' : 'application/x-www-form-urlencoded',
		'Content-Length' : postData.length
	}
};

var req = http.request(option, function(res){
	console.log(`STATUS: ${res.statusCode}`);
	console.log(`HEADERS: ${JSON.stringify(res.headers)}`);

	res.setEncoding('utf8');
	res.on('data', function(chunk){
		console.log(`BODY: ${chunk}`);
	});
	res.on('end', function(){
		console.log('No more data in response');
	})
});

req.on('error', function(e){
	console.log(`problem with request: ${e.message}`);
});

req.write(postData);
req.end();