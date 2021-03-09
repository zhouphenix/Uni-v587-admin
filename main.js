import Vue from 'vue'
import App from './App'
import store from './store'
import plugin from './js_sdk/uni-admin/plugin'
import fullscreen from 'vue-fullscreen'
import V587Theme from '@/uni_modules/v587-theme/plugin.js'
import V587Directive from 'js_sdk/v587-directive/index.js'

Vue.config.productionTip = false

Vue.use(plugin)
Vue.use(fullscreen)
Vue.use(V587Directive)
Vue.use(V587Theme, {store, theme: 'light', locale: 'zh_CN'})

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
