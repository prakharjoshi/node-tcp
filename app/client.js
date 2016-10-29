var net = require('net');
var readline = require('readline');

module.exports = {
  clientConnect: clientConnect
};

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function clientConnect (port, address, onConnection) {
    if (typeof port !== "number") throw new TypeError("port must be number");
    if (typeof address !== "string") throw new TypeError("address must be string");

    var client = new net.Socket();
    client.connect(port, address, onConnection)
    return client;
}

client = clientConnect(9000, "127.0.0.1", function() {
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
