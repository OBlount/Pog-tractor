import Vue from 'vue'
import Vuex from 'vuex'
import { IPog } from '../../../@types'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        LiveTrackers: [  ] as string[],
        POG_ARR: [  ] as IPog[],
        Timer: 60
    },
    mutations: {

        ADD_TRACKER: (state, trackerName: string): void => {
            state.LiveTrackers.push(trackerName);
        },

        REMOVE_TRACKER: (state, trackerName: string): void => {
            const index = state.LiveTrackers.indexOf(trackerName);
            state.LiveTrackers.splice(index, 1);
        },

        APPEND_TO_POG_ARR: (state, PogObj: IPog): void => {
            state.POG_ARR.push(PogObj);
        },

        CLEAR_POG_ARR: (state): void => {
            // Clear the array:
            state.POG_ARR = [  ]
        },

        TIMER_INC: (state): void => {
            state.Timer --;
        },

        TIMER_RESET: (state): void => {
            state.Timer = 60;
        }
    },
    actions: {

        ADD_TRACKER: (context, payload: string): void => {
            context.commit('ADD_TRACKER', payload);
        },

        REMOVE_TRACKER: (context, payload: string): void => {
            context.commit('REMOVE_TRACKER', payload);
        },

        APPEND_TO_POG_ARR: (context, payload: IPog): void => {
            context.commit('APPEND_TO_POG_ARR', payload);
        },

        CLEAR_POG_ARR: (context): void => {
            context.commit('CLEAR_POG_ARR');
        },

        TIMER_INC: (context): void => {
            context.commit('TIMER_INC');
        },

        TIMER_RESET: (context): void => {
            context.commit('TIMER_RESET');
        }
    },
    modules: {
    }
})
