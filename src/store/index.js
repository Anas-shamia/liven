import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueAuth from '@websanova/vue-auth'

Vue.use(VueAxios, axios);

axios.defaults.baseURL = 'http://it-team-dev.com/api';

// const $token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
function getToken() {
    return 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiMzJkMmE5ZGU4NDE4YmI5N2YxYThiMDcwODlmYjVmNTkzZDRkYjY2NGMwNGQwNTFjYmQ3MmE4Y2VkY2NkNjZkZDU5OWZiN2E3NzdlZjg0ODYiLCJpYXQiOjE1ODczNzM4NDcsIm5iZiI6MTU4NzM3Mzg0NywiZXhwIjoxNjE4OTA5ODQ3LCJzdWIiOiIxMjIiLCJzY29wZXMiOltdfQ.cCjmCsRTMGywJkLiUZKtt-hrg0Inx6T2jYx7DIeaNeR-1YdDKiK444cCFJspyq9IR3HOlFkWk2ugkxyijgmDLg' //localStorage.getItem('token')
}
axios.defaults.headers.common['Authorization'] = getToken();

axios.interceptors.request.use(function (config) {
    config.headers.Authorization = getToken();
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

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
        token: null
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
        setToken: (state, item) => {
            state.token = item;
        }
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
        getToken({commit}, item) {
            commit('setToken', item);
        },
    }
})
