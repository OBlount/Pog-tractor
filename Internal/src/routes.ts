import { Application } from 'express';
import { liveClient } from './server';
import { AddChannelToPool, POG_ARR } from './pog-tractor';

const serverOnBootTime: string = new Date().toLocaleString();

export default (server: Application) => {
    server.get('/', (req, res) => {
        let tempChannelArray: string[] = [  ];
        POG_ARR.forEach(channelEl => {
            tempChannelArray.push(` ${channelEl.channelName.replace('#', '')}: ${channelEl.totalPogTally}`);
        })

        res.send(`<h1>Server Online</h1><br>
        <p>Booted on the: ${serverOnBootTime}</p><br>
        <p>Channels in the pool:</p>
        <p>${tempChannelArray}</p>`);
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
}