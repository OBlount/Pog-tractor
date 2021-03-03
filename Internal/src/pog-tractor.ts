import { Client } from 'tmi.js';
import { Config } from '../@types/index';
import tmi = require('tmi.js');

export function CreateTmiClient(clientConfig: Config): Client {
	// Defined defaults:
	const defaultServer: string = 'irc-ws.chat.twitch.tv';
	const defaultInsecurePort: number = 80;
	const defaultSecurePort: number = 443;
	
	// Create the client and pass in the config:
	const client: Client = new tmi.Client(clientConfig);
	client.connect();

	// Assign defualt values if needed:
	let actualServer: string = client.getOptions().connection?.server || defaultServer;
	let actualPort;

	if (client.getOptions().connection?.secure) {
		actualPort = defaultSecurePort;
	}

	else {
		actualPort = defaultInsecurePort;
	}

	// Print the potential server the client will be connecting to:
	console.log(`[PROCCESS] Potentially connecting to ${actualServer}:${actualPort}`);

	return client;
}