<template>
    <div class="home">
        <h1>Pog-tractor: Test Landing Page</h1>
        <img alt="Vue logo" src="../assets/logo.jpg" height="200px;">
        <h1>Testing tracker components:</h1>

        <input type="text" name="ChannelName" placeholder="Name of channel" autocomplete="off"
        v-model="inputChannelValue"
        @keyup.enter="SubmitChannelNames()">

        <button @click="SubmitChannelNames()">Submit</button>
        <br>
        <p>Refresh Timer: {{ $store.state.Timer }}</p>

        <ul class="TrackersList">
            <li class="TrackersList" v-for="(trackerName, index) in $store.state.LiveTrackers" :key="index">
                <Tracker :channelName="trackerName" :pogTally="GetPogTally(trackerName)"/>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Tracker from '@/components/TrackerComponent.vue';
import Services from '@/services/session';
import { IPog } from '../../../@types';

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
            this.$store.dispatch('ADD_TRACKER', this.inputChannelValue);
        }

        else if (currentStatusCode === 500) {
            console.log(currentStatusMsg);
        }

        this.inputChannelValue = '';
    }

    private async RequestChannelData(): Promise<void> {
        const res = await Services.RequestChannelData({
            channelNames: this.$store.state.LiveTrackers as string[]
        })

        const currentStatusCode: number = res?.data.stcode;
        const currentStatusMsg: string = res?.data.stmsg;
        const currentDataRequested: IPog[] = res?.data.dataRequested;
        if (currentStatusCode === 200) {
            console.log(currentStatusMsg);

            // Clear the original array:
            this.$store.dispatch('CLEAR_POG_ARR');

            // Append with the newly requested and updated data:
            this.$store.dispatch('APPEND_TO_POG_ARR', currentDataRequested);
        }

        else if (currentStatusCode === 500) {
            console.log(currentStatusMsg);
        }
    }

    private TimerManager(): void {
        this.$store.dispatch('TIMER_INC');
        const currentTime: number = this.$store.state.Timer;

        if (currentTime === 0) {
            this.$store.dispatch('TIMER_RESET');
            this.RequestChannelData();
        }
    }

    private GetPogTally(reqChannelName: string): number {
        let pogTally: number = 0;
        // Grab the POG_ARR:
        const currentTempPogArr: IPog[] | undefined = this.$store.state.POG_ARR[0];

        // Loop through the currentPogArrTemp:
        if (currentTempPogArr) {
            let index: number;
            for (index = 0; index < currentTempPogArr.length; index++) {
                if (currentTempPogArr[index].channelName === reqChannelName) {
                    pogTally = currentTempPogArr[index].totalPogTally;
                }
            }
        }

        return pogTally;
    }

    private mounted() {
        // When the page is loaded, begin the refresh countdown
        setInterval(this.TimerManager, 1000);
    }
}
</script>

<style scoped>
.TrackersList {
    list-style-type: none;
}
</style>