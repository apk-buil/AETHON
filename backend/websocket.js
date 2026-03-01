// backend/websocket.js

const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket) => {
    console.log('A new client connected!');

    socket.on('message', (message) => {
        console.log(`Received: ${message}`);
        // Broadcast the message to all connected clients
        server.clients.forEach((client) => {
            if (client !== socket && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    socket.on('close', () => {
        console.log('Client has disconnected.');
    });
});

console.log('WebSocket server is running on ws://localhost:8080/');