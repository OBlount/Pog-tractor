import { Application, Request, Response } from 'express';
import path = require('path');
import { Config } from '../@types/index';
import { CreateTmiClient } from './pog-tractor';

import express = require('express');
const server: Application = express();
const port: number = 5050;

server.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../public/views/index.html'));
})

server.listen(port, () => {
    console.log(`[PROCCESS] Local server listening at http://localhost:${port}`);
})

// Test Config
const testConfig: Config = {
    options: {
        clientId: 'Test123',
        debug: true
    },
    connection: {
        reconnect: true,
        secure: true,
    },
    channels: [  ]
}

let client = CreateTmiClient(testConfig);