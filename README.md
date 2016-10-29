This is a basic tcp socket connect built on node js libarary. It connects 2 clients and trasfer messages between two clients until they are connect to each other. Once a client is disconnected, the other one will be informed that now you can't exchanges data stream with the other client.
If the client again connects to the server then again both the clients can exchange the data streams between them.

This module is built in the manner that there is a centralized server running on a port.
To run that server go to app directory
```
cd node-tcp/app
```
and run
```
node server.js
```
if you see something like this in the server tab
```KEEP CALM THE SERVER IS UP AT 9000```

Then your server is sucessfully running on the port `9000`.

This will run the server on the port `9000` and will wait for clients to connect with it and make sockets.

Open new tab and run the client server.
```
cd node-tcp/app
node client.js
```
client tab will look something like this with a welcome message from server
```
You are connected to the server. Hope you enjoy your stay here!!
Try to send message to your friend if they are online they will see your message
```
Open another tab and run another client
```
node client.js
```
Now at this point we have a server running and two clients which have made sockets with the server.
When you look at the server logs on server tab you will see something like this
```
KEEP CALM THE SERVER IS UP AT 9000

Connection received from 127.0.0.1:52469
Connection received from 127.0.0.1:52473
```
This means both the clients have made socket with the server and we are good to go for transferring messages between the clients.

Clients can write message in command like to other client like this
CLIENT 1
```
You are connected to the server. Hope you enjoy your stay here!!
Try to send message to your friend if they are online they will see your message

Hey
```
The other client will recieve the message like this
CLIENT-2
```
You are connected to the server. Hope you enjoy your stay here!!
Try to send message to your friend if they are online they will see your message

Your friend wrote: Hey
```

Now when some client get disconnected from server manually or by some other means then both client-2 and server will get notified about that like this
SERVER
```
KEEP CALM THE SERVER IS UP AT 9000

Connection received from 127.0.0.1:52469
Connection received from 127.0.0.1:52473
connection from 127.0.0.1:52469 closed
```

CLIENTS-2
```
You are connected to the server. Hope you enjoy your stay here!!
Try to send message to your friend if they are online they will see your message

Your friend wrote: Hey
Your friend wrote: I am going offline and can't chat with you now.
```

When server is facing some downtime, the clients connected to the server will get notified like this
```
KEEP CALM THE SERVER IS DOWN!! TRY IT AFTER SOME TIME.
```

For running the tests you need to come back to base folder that is `node-tcp` and run
```
mocha
```
This will trigger the test file and will run all the test cases present in that file.
