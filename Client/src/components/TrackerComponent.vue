<template>
    <div class="Tracker">
        <img id="DeleteButton" src="@/assets/DeleteButton.png" alt="Delete" @click="OnDelete()">
        <div class="TrackerContent">
            <a target="_blank" :href="twitchLink">{{ channelName }}</a>
            <p>Pog Rate: {{ pogRate }}</p>
            <!-- Future reference when implementing chart.js -->
            <canvas id="PogChart"></canvas>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Services from '@/services/session';

@Component
export default class Tracker extends Vue {
    @Prop() public channelName!: string;
    @Prop() private pogRate!: number;
    private twitchLink: string = 'https://www.twitch.tv/' + this.channelName;

    private async OnDelete(): Promise<void> {
        const res = await Services.DeleteChannelFromClient({
            channelName: this.channelName
        })

        const currentStatusCode: number = res?.data.stcode;
        const currentStatusMsg: string = res?.data.stmsg;
        if (currentStatusCode === 200) {
            console.log(currentStatusMsg);
            this.$store.dispatch('REMOVE_TRACKER', this.channelName);
        }

        else if (currentStatusCode === 500) {
            console.log(currentStatusMsg);
        }
    }
}
</script>

<style scoped>
    .Tracker {
        position: relative;
        display: grid;
        grid-template-columns: 30px auto;
        grid-auto-flow: column;
        align-items: center;
        left: 25%;
        width: 50%;
        margin: 12px;
        padding: 12px;
        background-color: #f5f5f5;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .TrackerContent {
        color: #fff;
        background: #2d2d2d;
        grid-auto-flow: column;
        padding: 5px;

        display: grid;
        grid-auto-flow: column;
        align-items: center;
        justify-items: center;
    }

    #PogChart {
        background-color: aliceblue;
        width: 100%;
        height: 82px;
    }

    #DeleteButton {
        height: 20px;
        width: 20px;
    }

    #DeleteButton:hover {
        cursor: pointer;
    }

    a {
        font-weight: bold;
        font-size: 150%;
        color: hotpink;
        text-decoration: none;
    }

    p {
        font-size: 150%;
    }
</style>
