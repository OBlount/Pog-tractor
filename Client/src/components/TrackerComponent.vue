<template>
    <div class="Tracker">
        <img id="DeleteButton" src="@/assets/DeleteButton.png" alt="Delete" @click="OnDelete()">
        <img class="TwtichAvt" alt="Twitch Avatar" :src="twitchAvt">
        <div class="TrackerContent">
            <a target="_blank" :href="twitchLink">{{ channelName }}</a>
            <p>Pog Rate: {{ pogRate }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component,  } from 'vue-property-decorator';

@Component
export default class Tracker extends Vue {
    private twitchAvt: string = '';
    private channelName: string = 'Channel-Name';
    private twitchLink: string = 'https://www.twitch.tv/' + this.channelName;
    private pogRate: number = 0;

    public OnDelete(): void {
		console.log('[Implement Delete function]')
    }
}
</script>

<style scoped>
    .Tracker {
        position: relative;
        display: grid;
        grid-template-columns: 5% 10% auto;
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

    .TwtichAvt {
        max-height: 70px;
        max-width: 70px;
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
