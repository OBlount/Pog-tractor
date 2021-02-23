import express = require('express');
import { Application, Request, Response } from 'express';
import { Config } from '../@types/index';
import { CreateTmiClient } from './pog-tractor';
require('dotenv').config();

const server: Application = express();
const port = process.env.PORT || 8081;

server.get('/', (req: Request, res: Response) => {
    res.send('HELLO WORLD');
})

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