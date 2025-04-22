const express = require('express');
const bodyParser = require('body-parser');
const passport = require('./auth');
const initWebsocket = require('././websockets/socket')
const app = express();
const http = require('http');
const port = process.env.PORT || 3000;
const cors = require('cors')
//routes
const userRoute = require('./routes/user-route.js');
// const chatRoute = require('./routes/chat-route.js')
require('dotenv').config();
require('./configs/database');

app.use(cors())
app.use(bodyParser.json());
app.use(passport.initialize());

const server = http.createServer(app)
initWebsocket(server)

const localAuthMiddleware = passport.authenticate('local', { session: false })


app.use('/api/user', userRoute);
// app.use('/api/chat', chatRoute);

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})