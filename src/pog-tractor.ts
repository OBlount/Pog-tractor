import { ChatUserstate, Client } from "tmi.js";

const tmi = require('tmi.js');

const client:Client = new tmi.Client({
	connection: { reconnect: true },
	channels: []
})

client.connect();

client.on('message', (channel:string, tags:ChatUserstate, message:string, self:boolean) => {
	console.log(`${tags['display-name']}: ${message}`);
})