var net = require('net');
var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var client = new net.Socket();
client.connect(9000, '127.0.0.1', function() {
	console.log('You are connected to the server. Hope you enjoy your stay here!! \nTry to send message to your friend if they are online they will see your message\n');
	rl.on('line', function(line){
	  	client.write(line);
	});
});

client.on('data', function(data) {
	console.log('Your friend wrote: ' + data);
});

client.on('close', function() {
	console.log('KEEP CALM THE SERVER IS DOWN!! TRY IT AFTER SOME TIME.');
});
