import Api from '@/services/Api';

export default {
    AddToChannelPool(channelNames: {channelName: string}) {
        return Api().post('channelPost', channelNames);
    }
}