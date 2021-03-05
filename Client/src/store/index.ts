import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        LiveTrackers: [  ] as string[]
    },
    mutations: {
        REMOVE_TRACKER: (state, trackerName: string) => {
            const index = state.LiveTrackers.indexOf(trackerName);
            state.LiveTrackers.splice(index, 1);
        }
    },
    actions: {
        REMOVE_TRACKER: (context, payload: string) => {
            context.commit('REMOVE_TRACKER', payload);
        }
    },
    modules: {
    }
})
