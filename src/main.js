import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueI18n from 'vue-i18n'

import Mobile from './layouts/app.vue';


import {ValidationProvider} from 'vee-validate/dist/vee-validate.full.esm';
import {ValidationObserver} from 'vee-validate';

import VueLodash from 'vue-lodash'
import lodash from 'lodash'

Vue.use(VueLodash, {name: 'custom', lodash: lodash})


import {Datetime} from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css';


import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'


import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
import VCalendar from 'v-calendar';


Vue.use(VCalendar);


import HighchartsVue from 'highcharts-vue'

Vue.use(HighchartsVue);

Vue.use(VueI18n);
Vue.component('mobile-layout', Mobile);

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.component('datetime', Datetime);
Vue.component('v-select', vSelect);
Vue.component('VueSlider', VueSlider);

Vue.use(PerfectScrollbar);

const messages = {
    en: {
        message: {
            hello: 'hello world'
        }
    },
    ar: {
        message: {
            hello: 'مرحبا'
        }
    }
};
const i18n = new VueI18n({
    locale: 'ar', // set locale
    messages, // set locale messages
});

import store from './store'
import './registerServiceWorker'
import './assets/css/tailwind.css'

Vue.config.productionTip = false;


new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app');
