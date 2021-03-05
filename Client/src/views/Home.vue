<template>
    <div class="home">
        <h1>Pog-tractor: Test Landing Page</h1>
        <img alt="Vue logo" src="../assets/logo.jpg" height="200px;">
        <h1>Testing tracker components:</h1>

        <input type="text" name="ChannelName" placeholder="Name of channel" autocomplete="off"
        v-model="inputChannelValue"
        @keyup.enter="SubmitChannelNames()">

        <button @click="SubmitChannelNames()">Submit</button>

        <ul class="TrackersList">
            <li class="TrackersList" v-for="(trackerName, index) in $store.state.LiveTrackers" :key="index">
                <Tracker :channelName="trackerName"/>
            </li>
        </ul>   
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Tracker from '@/components/TrackerComponent.vue';
import Services from '@/services/session';

@Component({
  components: {
    Tracker,
  },
})
export default class Home extends Vue {
    private inputChannelValue: string = '';

    private async SubmitChannelNames(): Promise<void> {
        const res = await Services.AddToChannelPool({
            channelName: this.inputChannelValue
        })

        const currentStatusCode: number = res?.data.stcode;
        const currentStatusMsg: string = res?.data.stmsg;
        if (currentStatusCode === 200) {
            console.log(currentStatusMsg);
            this.$store.state.LiveTrackers.push(this.inputChannelValue);
        }

        else if (currentStatusCode === 500) {
            console.log(currentStatusMsg);
        }

        this.inputChannelValue = '';
    }
}
</script>

<style scoped>
.TrackersList {
    list-style-type: none;
}
</style>