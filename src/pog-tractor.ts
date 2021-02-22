import { ChatUserstate, Client } from 'tmi.js';
import { pog } from '../@types/index';
const tmi = require('tmi.js');

const client: Client = new tmi.Client({
	connection: { reconnect: true },
	channels: [ 'bl0unty_' ]
})

client.connect();

client.on('message', (channel: string, tags: ChatUserstate, message: string): void => {
	console.log(`${tags['display-name']}: ${message}`);
})