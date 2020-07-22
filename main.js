import Vue from 'vue'
import App from './App.vue'

import Api from './request/api.js'
import url_config from './request/config.js';
import uniIcons from "./components/uni-icons/uni-icons.vue"

Vue.config.productionTip = false;
Vue.prototype.$api = Api;
Vue.prototype.$imageUrl = url_config + '/source/image/origin/';
Vue.prototype.$tabIndex = 0;

Vue.component('uniIcons',uniIcons);

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
