import Api from '@/services/Api';

export default {
    AddToChannelPool(channelName: {channelName: string}) {
        try {
            return Api().post('addChannelToClient', channelName);
        }
        catch {
            console.log(`[ERROR] Can't reach '${Api().getUri()}'`);
        }
    },

    RequestChannelData(channelNames: {channelNames: string[]}) {
        try {
            return Api().post('requestData', channelNames);
        }
        catch {
            console.log(`[ERROR] Can't reach '${Api().getUri()}'`);
        }
    }
}