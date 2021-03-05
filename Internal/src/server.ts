import express = require('express');
import { Application } from 'express';
import bodyParser = require('body-parser');
import cors = require('cors');
import routes from './routes';
import { Config } from '../@types';
import { CreateTmiClient } from './pog-tractor';
require('dotenv').config({path: '../.env'});

// Configure an express application
const server: Application = express();
server.use(bodyParser.json());
server.use(cors());

const port: string | number = process.env.PORT || 8081;

// Import the routes here
routes(server);

server.listen(port, () => {
    console.log(`[PROCESS] Local server listening at http://localhost:${port}`);
})

// Test/temp config
const tmiTestConfig: Config = {
    options: {
        clientId: 'Test123',
        debug: false
    },
    connection: {
        reconnect: true,
        secure: true,
    },
    channels: [ ]
}

// Create one TMI client with empty channels
const liveClient = CreateTmiClient(tmiTestConfig);
export { liveClient };