import { Application, Request, Response } from 'express';
import path = require('path');

import express = require('express');
const server: Application = express();
const port: number = 5050;

server.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../public/views/index.html'));
})

server.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})