const Websocket = require('ws');

const initWebsocket = (server) => {
    const wss = new Websocket.Server({ server });

    wss.on("connection", (ws) => {
        console.log("New CliuentConnected to Websocket!");

        ws.on("message", (data) => {
            const message = JSON.parse(data);
            if (message.type === "typing") {
                wss.clients.forEach((client) => {
                    if (client !== ws && client.readyState === Websocket.OPEN) {
                        client.send(JSON.stringify({ type: "typing", sender: message.sender }));
                    }
                });
            } else if (message.type === "stopTyping") {
                // Broadcast stop typing event to all other clients
                wss.clients.forEach((client) => {
                    if (client !== ws && client.readyState === Websocket.OPEN) {
                        client.send(JSON.stringify({ type: "stopTyping", sender: message.sender }));
                    }
                });
            } else {
                // console.log("Message received: ", message);
                //Broadcast the msg to all clients
                wss.clients.forEach((client) => {
                    if (client !== ws && client.readyState === Websocket.OPEN)
                        client.send(JSON.stringify(message));
                })
            }

        })

        ws.on('close', () => {
            console.log("Client disconnected!");
        })
    });
}

module.exports = initWebsocket;