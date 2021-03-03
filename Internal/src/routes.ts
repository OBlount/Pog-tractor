import { Application } from 'express';
import { liveClient } from './server';

const serverOnBootTime: string = new Date().toLocaleString();

export default(server: Application) => {
    server.get('/', (req, res) => {
        res.send(`<h1>Server Online</h1><br> Booted on the: ${serverOnBootTime}`);
    })

    server.post('/channelPost', (req, res) => {
        const channelNameInput: string = req.body.channelName;
        liveClient.join(channelNameInput);
        
        res.send({
            stcode: `[${res.statusCode}] Channel input: ${channelNameInput}`,
            totalNumChannels: liveClient.getChannels().length
        })
    })
}