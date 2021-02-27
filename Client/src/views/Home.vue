<template>
    <div class="home">
        <h1>Pog-tractor: Test Landing Page</h1>
        <img alt="Vue logo" src="../assets/logo.jpg" height="200px;">
        <h1>Testing tracker components:</h1>
        <Tracker/>
        <Tracker/>
        <Tracker/>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Tracker from '../components/TrackerComponent.vue';

@Component({
  components: {
    Tracker,
  },
})
export default class Home extends Vue {}
</script>
