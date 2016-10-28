var net = require('net');

module.exports = {
  createServer: createServer
};

function createServer(port, address, onConnection) {
  if (typeof address === "function" && typeof onConnection === "undefined") {
    onConnection = address;
    address = "127.0.0.1";
  }
  if (typeof port !== "number") throw new TypeError("port must be number");
  if (typeof address !== "string") throw new TypeError("address must be string");
  if (typeof onConnection !== "function") throw new TypeError("onConnection must be function");
}

var server = net.createServer();
server.on('connection', handleConnection);

server.listen(
  9000,
  function() { 
    console.log("KEEP CALM THE SERVER IS UP AT 9000\n");
  });

var clientSockets = [];

function startRelay (sourceSocket, destSocket) {
    sourceSocket.on('data', function (data) {
      destSocket.write(data);
    });
  }

function handleConnection(socket) {
  socket.name = socket.remoteAddress + ':' + socket.remotePort;
  console.log('Connection received from ' + socket.name);
  clientSockets.push(socket);
  if (clientSockets.length == 2){
    startRelay(clientSockets[0], clientSockets[1], clientSockets);
    startRelay(clientSockets[1], clientSockets[0], clientSockets);
  }
  socket.once('close', onConnClose);
  socket.on('error', onConnError);

  function onConnClose() {
    console.log('connection from %s closed', socket.name);
    if (socket === clientSockets[0] && clientSockets.length==2){
      clientSockets[1].write("Seems like your friend is offline. "+ socket.name + " left the chat.\n");
    }
    else{
      clientSockets[0].write("Seems like your friend is offline. "+ socket.name + " left the chat.\n")
    }
    clientSockets.splice(clientSockets.indexOf(socket), 1);
  }

  function onConnError(err) {
    console.log('Connection %s error: %s', socket.name, err.message);
  }
}
