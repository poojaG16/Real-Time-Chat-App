const Websocket = require('ws');

const initWebsocket = (server) => {
    const wss = new Websocket.Server({ server });

    wss.on("connection", (ws) => {
        console.log("New CliuentConnected to Websocket!");

        ws.on("message", (data) => {
            const message = JSON.parse(data);
            console.log("Recevied: ", message);

            //Broadcast the msg to all clients
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === Websocket.OPEN)
                    client.send(JSON.stringify(message));
            })
        })

        ws.on('close', () => {
            console.log("Client disconnected!");
        })
    });
}

module.exports = initWebsocket;