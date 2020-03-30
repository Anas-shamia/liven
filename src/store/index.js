import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueAuth from '@websanova/vue-auth'

Vue.use(VueAxios, axios);


Vue.axios.defaults.baseURL = 'http://it-team-dev.com/api';

Vue.axios.defaults.headers.common['Authorization'] = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiODgyMzcxNjhmNWFiYmIyYTU4MzFhMTE2ZDcxMzJiNjE0MTlkYzhmYzYzMDZmZmUzMjM3ZjM1NmQzMDZmMTM5MTc1OGYzMGNlODlkZTFjMTEiLCJpYXQiOjE1ODU0MzQxNjEsIm5iZiI6MTU4NTQzNDE2MSwiZXhwIjoxNjE2OTcwMTYxLCJzdWIiOiIzNCIsInNjb3BlcyI6W119.ExNLUqofu0dKdMGHcyWS8TVD8-MHkIz836Xh9WSro2_sT9mSYtVRY7i7iIuvQ7_qhmVuxlCkU1PHxVbaf4PsOA`;
//`Bearer ${localStorage.getItem('token')}`;

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
