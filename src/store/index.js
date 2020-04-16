import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueAuth from '@websanova/vue-auth'

Vue.use(VueAxios, axios);

Vue.axios.defaults.baseURL = 'http://it-team-dev.com/api';

// const $token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
const $token = localStorage.getItem('token');
Vue.axios.defaults.headers.common['Authorization'] = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiZTdlNzI0NzkzNDQzZDJmMjU3NWU1NjU5NDZlZjU2NDU4ZTEyMzkzYmMxMDA1MjAyYTVjNzNkNWIzYjg0ZDkzZmY0YWZkMDBmNGEwYjMwMWUiLCJpYXQiOjE1ODcwNjUwNzcsIm5iZiI6MTU4NzA2NTA3NywiZXhwIjoxNjE4NjAxMDc3LCJzdWIiOiIxMjIiLCJzY29wZXMiOltdfQ.OF-1DQhIOlxgiVFmOMz3t5l0c7c0iP1fWRLWL0DVBIdOkP6eLl-wPSrsu3mBiVHIP4J2BvUSZmp-6unwH1IJCA`;

// `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiYTJhYTJjMmE3NmM2OTZhNzFjMjI1ZTM4NzVjNjQyMDk1MzhmNTE5ZWJlZWQ2MmU3MjNlMjNhZDhkNThkNzdjYzZiNGM1ZWM0NGFlOGM4MTUiLCJpYXQiOjE1ODYxODMwOTksIm5iZiI6MTU4NjE4MzA5OSwiZXhwIjoxNjE3NzE5MDk5LCJzdWIiOiI5MSIsInNjb3BlcyI6W119.EbMdlV60geri652XkKVPtXx7Vt9spEmGQfJbc5tfnTPgnxPxyLusFGb1-vz-5izFLUTys4bpcqIoln8hMBubpQ`;

Vue.use(VueAuth, {
    auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
    http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
    router: require('@websanova/vue-auth/drivers/router/vue-router.2.x'),
});
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        showMeal: false,
        menuOpen: false,
        openCall: false,
    },
    mutations: {
        setMealShow(state, status) {
            state.showMeal = status
        },
        setOpenMenu: (state, item) => {
            state.menuOpen = item;
        },
        setCallOpen: (state, item) => {
            state.openCall = item;
        },
    },
    actions: {
        getMealShow({commit}, status) {
            commit('setMealShow', status)
        },
        getOpenMenu({commit}, item) {
            commit('setOpenMenu', item);
        },
        getCallOpen({commit}, item) {
            commit('setCallOpen', item);
        },
    }
})
