import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';

import vSelect from 'vue-select';
import underscore from 'vue-underscore';

import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
// app.js
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import { GridPlugin } from '@syncfusion/ej2-vue-grids';
import '@syncfusion/ej2-vue-grids/styles/bootstrap4.css';
import VueMonthlyPicker from 'vue-monthly-picker';

// import * as md5 from 'js-md5';

Vue.use(GridPlugin);

Vue.component('v-select', vSelect);
require('moment/locale/bg');

Vue.use(BootstrapVue);
Vue.use(require('vue-moment'));

Vue.component('my-component', {
  components: {
    VueMonthlyPicker,
  },
});
Vue.use(underscore);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
