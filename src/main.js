import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'

import axios from 'axios'
// 配置请求的跟路径
// axios.defaults.baseURL = 'http://127.0.0.1:8080/crm/private/v1/'
axios.interceptors.request.use(config => {
  // console.log(config)
  config.headers.Authorization = 'bearer '+window.sessionStorage.getItem('access_token')
  // 在最后必须 return config
  return config
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response
  }, function (error) {
    // 对响应错误做点什么
    if (error.response) {
      switch (error.response.status) {
        case 401:
          window.sessionStorage.removeItem("access_token");
          router.push('/login')
          break;
        case 403:
          router.push('/login')
          break;
      }
    }
    return Promise.reject(error)
  });

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
