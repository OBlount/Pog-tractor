import { Client } from 'tmi.js';
import { Config } from '../@types/index';
import tmi = require('tmi.js');

const re: string = '^[a-zA-Z0-9_]{4,25}$';

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
	console.log(`[PROCESS] Potentially connecting to ${actualServer}:${actualPort}`);

	return client;
}

export async function AddChannelToPool(client: Client, channelName: string): Promise<boolean> {
	let successfulAttempt: boolean = false;
	let isToTwitchUsernameStandard: boolean = false;
	console.log(`[PROCESS] Preparing to add ${channelName} to listener`);
	const channelListBuffer: string[] = client.getChannels();

	if (channelName.search(re) === 0) {
		isToTwitchUsernameStandard = true;
	}

	if (isToTwitchUsernameStandard) {
		if (channelListBuffer.includes(`#${channelName.toLowerCase()}`) === false) {
			try {
				await client.join(channelName);
				successfulAttempt = true;
			}
			catch(e) {
				console.log(`[ERROR] Couldn't connect to the chat: ${channelName}\n\r'${e}' - Perhaps the channel doesn't exist`)
				successfulAttempt = false
			}
		}
	}

	if (!successfulAttempt) {
		console.log(`[ERROR] Failed to add: ${channelName}`);
	}

	else {
		console.log(`[SUCCESS] Successfully added ${channelName}`);
	}

	return successfulAttempt;
}

export function RemoveChannelFromPool(client: Client, channelName: string): boolean {
	let successfulAttempt: boolean = false;
	console.log(`[PROCESS] Preparing to remove ${channelName} from listener`);
	const channelListBuffer: string[] = client.getChannels();

	channelListBuffer.forEach(channelNameInList => {
		if ((channelNameInList).toLowerCase() === (`#${channelName}`).toLowerCase()) {
			try {
				client.part(channelName).then;
				successfulAttempt = true;
			}
			catch(e) {
				console.log(`[ERROR] Couldn't remove the channel: ${channelName}\n\r'${e}'`)
				successfulAttempt = false;
			}
		}
	})

	if (!successfulAttempt) {
		console.log(`[ERROR] Failed to delete: ${channelName}`);
	}

	else {
		console.log(`[SUCCESS] Successfully removed ${channelName}`);
	}

	return successfulAttempt;
}