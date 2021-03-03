<template>
    <div class="home">
        <h1>Pog-tractor: Test Landing Page</h1>
        <img alt="Vue logo" src="../assets/logo.jpg" height="200px;">
        <h1>Testing tracker components:</h1>

        <input type="text" name="ChannelName" placeholder="Name of channel" autocomplete="off"
        v-model="inputChannelValue"
        @keyup.enter="SubmitChannelNames()">

        <button @click="SubmitChannelNames()">Submit</button>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Tracker from '@/components/TrackerComponent.vue';
import Services from '@/services/session'

@Component({
  components: {
    Tracker,
  },
})
export default class Home extends Vue {
    private inputChannelValue: string = '';

    private async SubmitChannelNames() {
        const res = await Services.AddToChannelPool({
            channelName: this.inputChannelValue
        })
        console.log(res.data);
        this.inputChannelValue = '';
    }
}
</script>