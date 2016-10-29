var net = require('net');
var chai = require('chai');

var should = require('chai').should();
var tcp_server = require('../app/server.js');

it('Lets start with perfect one', function (done) {

    // Set up a client and connect to port 31337 (or whatever port you use)
    var client1 = new net.Socket();
    client1.connect({ port: 9000 },
        function() {
            // Send some data
            client1.write("Hey I am client 1");
        }
    );
    var client2 = new net.Socket();
    client2.connect({ port: 9000 },
        function() {
            // Send some data
            client2.write("Hey I am client 2");
        }
    );
    // done();

    // When data is returned from server
    client1.on('data', function(data) {
        // Let's make sure data equals the correct message
        result = data.toString('utf-8');
        result.should.equal("Hey I am client 2");
        // client.end();
    });
    // When data is returned from server
    client2.on('data', function(data) {
        // Let's make sure data equals the correct message
        result = data.toString('utf-8');
        result.should.equal("Hey I am client 1");
        // client.end();
        client1.end();
        client2.end();
        done();
    });
});

it('lets change the result message', function (done) {

    // Set up a client and connect to port 31337 (or whatever port you use)
    var client1 = new net.Socket();
    client1.connect({ port: 9000 },
        function() {
            // Send some data
            client1.write("Hey I am client 1");
        }
    );
    var client2 = new net.Socket();
    client2.connect({ port: 9000 },
        function() {
            // Send some data
            client2.write("Hey I am client 2");
        }
    );
    // done();

    // When data is returned from server
    client1.on('data', function(data) {
        // Let's make sure data equals the correct message
        result = data.toString('utf-8');
        result.should.not.equal("Hey I am client 1");
        // client.end();
    });
    // When data is returned from server
    client2.on('data', function(data) {
        // Let's make sure data equals the correct message
        result = data.toString('utf-8');
        result.should.not.equal("Hey I am client 2");
        // client.end();
        client1.end();
        client2.end();
        done();
    });
});

it('lets change the closing order for client', function (done) {

    // Set up a client and connect to port 31337 (or whatever port you use)
    var client1 = new net.Socket();
    client1.connect({ port: 9000 }, function() {});
    client1.end();
    var client2 = new net.Socket();
    client2.connect({ port: 9000 },
        function() {
            // Send some data
            client2.write("Hey I am client 2");
        }
    );
    // done();

    // // When data is returned from server
    // client1.on('data', function(data) {
    //     // Let's make sure data equals the correct message
    //     result = data.toString('utf-8');
    //     result.should.not.equal("Hey I am client 1");
    // });
    // When data is returned from server
    client2.on('data', function(data) {
        // Let's make sure data equals the correct message
        result = data.toString('utf-8');
        result.should.equal("Seems like your friend is offline and can't chat with you chat.\n");
        // client.end();
        client2.end();
        done();
    });
});

it('lets close the client after receiving the msg', function (done) {

    // Set up a client and connect to port 31337 (or whatever port you use)
    var client1 = new net.Socket();
    client1.connect({ port: 9000 }, function() {
        client2.write("Hey I am client 1");
    });
    var client2 = new net.Socket();
    client2.connect({ port: 9000 },
        function() {
            // Send some data
            client2.write("Hey I am client 2");
        }
    );
    // done();

    // When data is returned from server
    client1.on('data', function(data) {
        // Let's make sure data equals the correct message
        result = data.toString('utf-8');
        result.should.not.equal("Hey I am client 2");
    });
    client1.end();
    // When data is returned from server
    client2.on('data', function(data) {
        result = data.toString('utf-8');
        result.should.equal("Seems like your friend is offline and can't chat with you chat.\n");
        client2.end();
        done();
    });
});
