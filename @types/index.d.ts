// For Client Configs for a tmi.js client
export interface Config {
    options: {
        clientId: string;
        debug: boolean;
    }
    connection: {
        server?: string;
        port?: number;
        reconnect?: boolean;
        secure?: boolean;
        maxReconnectAttempts?: number;
    }
    channels: string[];
}

// POG_DICT type
export interface IPog {
    channelName: string;
    totalPogTally: number;
}