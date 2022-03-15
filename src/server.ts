import 'reflect-metadata';
import './database';
import 'dotenv/config';

import * as http from 'http';

import { server as WebSocketServer } from 'websocket';

import { app } from './app';
import socket from './socket';

const server = http.createServer(app);

const io = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false,
});

server.listen(process.env.PORT || 3001, () => {
    console.log(`🚀 Server ready at port ${process.env.PORT || 3001}`);

    socket({ io });
});
