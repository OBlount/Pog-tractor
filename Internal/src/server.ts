import express = require('express');
import { Application, Request, Response } from 'express';
import bodyParser = require('body-parser');
import cors = require('cors');
import { Config } from '../@types/index';
import { CreateTmiClient } from './pog-tractor';
import routes from './routes';
require('dotenv').config();
require('./routes');

// Configure an express application
const server: Application = express();
server.use(bodyParser.json());
server.use(cors());

const port: string | number = process.env.PORT || 8081;

// Import the routes here
routes(server);

server.listen(port, () => {
    console.log(`[PROCCESS] Local server listening at http://localhost:${port}`);
})

// Test Config
const testConfig: Config = {
    options: {
        clientId: 'Test123',
        debug: false
    },
    connection: {
        reconnect: true,
        secure: true,
    },
    channels: [  ]
}

let client = CreateTmiClient(testConfig);