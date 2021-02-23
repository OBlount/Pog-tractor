// The Pog Obj
export interface Pog {
    channelName: string;
    pogCount: number;
    time: number;
}

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