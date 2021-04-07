import { Client } from 'tmi.js';
import { Config, IPog } from '../../@types/index';
import { IncrementTallyInArr } from './utils';
import tmi = require('tmi.js');

const re: string = '^[a-zA-Z0-9_]{4,25}$';

let POG_ARR: IPog[] = [  ];

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
	let actualPort: number;

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
	let isInTMIChannelPool: boolean = false;
	console.log(`[PROCESS] Preparing to add ${channelName} to listener`);
	const channelListBuffer: string[] = client.getChannels();
	isInTMIChannelPool = channelListBuffer.includes(`#${channelName.toLowerCase()}`);

	// Make sure the requested channel name is to Twitch username standards:
	if (channelName.search(re) === 0) {
		isToTwitchUsernameStandard = true;
	}

	if (isToTwitchUsernameStandard) {
		// Checks if the channel is already in the channel name pool:
		if (isInTMIChannelPool === false) {
			try {
				await client.join(channelName);

				// Append the channel name into the POG_ARR which records globally:
				const POG_TEMP: IPog = {
					channelName: `#${channelName.toLocaleLowerCase()}`,
					totalPogTally: 0
				}
				POG_ARR.push(POG_TEMP);

				successfulAttempt = true;
			}
			catch(e) {
				console.log(`[ERROR] Couldn't connect to the chat: ${channelName}\n\r'${e}' - Perhaps the channel doesn't exist`);
				successfulAttempt = false;
			}
		}
	}

	if (!successfulAttempt) {
		console.log(`[ERROR] Failed to add: ${channelName}`);
	}

	else {
		console.log(`[SUCCESS] Successfully added ${channelName}`);
	}

	// However, if the channel is already present, we still want to send a success attempt to the client:
	if (isInTMIChannelPool === true) {
		console.log(`[SUCCESS] However, ${channelName} is already present in the channel pool`);
		successfulAttempt = true;
	}

	return successfulAttempt;
}

export function DetectPog(client: Client): void {

	client.on('message', (channel: string, message: tmi.ChatUserstate, self: string) => {
		// If a message contains any emotes:
		if (message['emotes-raw']) {
			const rawEmoteString: string = message['emotes-raw'];
			let rawEmoteArr: string[] = rawEmoteString.split('/');

			// Check if the emotes-raw contains the PogChamp emote:
			rawEmoteArr.forEach(emoteID => {
				if (emoteID.includes('305954156:')) {
					IncrementTallyInArr(POG_ARR, channel);
				}
			})
		}

		// As there's no official Pog-emote anymore, it is worth checking if the message contains 'pog' anywhere:
		else {
			if (self.toLowerCase().includes('pog')) {
				IncrementTallyInArr(POG_ARR, channel);
			}
		}
	})
}

export { POG_ARR };