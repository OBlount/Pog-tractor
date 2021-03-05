import { Application } from 'express';
import { liveClient } from './server';
import { AddChannelToPool, RemoveChannelFromPool } from './pog-tractor';

const serverOnBootTime: string = new Date().toLocaleString();

export default (server: Application) => {
    server.get('/', (req, res) => {
        res.send(`<h1>Server Online</h1><br> Booted on the: ${serverOnBootTime}`);
    })

    server.post('/addChannelToClient', async (req, res) => {
        const channelNameInput: string = req.body.channelName;
        let liveClientChannelLength: number = liveClient.getChannels().length;
        const isSuccess: boolean = await AddChannelToPool(liveClient, channelNameInput);

        if (isSuccess) {
            res.send({
                stcode: 200,
                stmsg: `ADDED: ${channelNameInput}`,
                totalNumChannels: liveClientChannelLength + 1
            })
        }

        else {
            res.send({
                stcode: 500,
                stmsg: `Failed to add: ${channelNameInput}`,
                totalNumChannels: liveClientChannelLength
            })
        }
    })

    server.post('/deleteChannelFromClient', (req, res) => {
        const deletedChannel: string = req.body.channelName;
        let liveClientChannelLength: number = liveClient.getChannels().length;
        const isSuccess: boolean = RemoveChannelFromPool(liveClient, deletedChannel);

        if (isSuccess) {
            res.send({
                stcode: 200,
                stmsg: `DELETED: ${deletedChannel}`,
                totalNumChannels: liveClientChannelLength - 1
            })
        }

        else {
            res.send({
                stcode: 500,
                stmsg: `Failed to delete: ${deletedChannel}`,
                totalNumChannels: liveClientChannelLength
            })
        }
    })
}