import Vue from 'vue'
import App from './App.vue'
import router from './router'
import api from './services/install'
import ambush from './ambush/index.js'
import {Toast,Lazyload } from 'vant'
import VTrack from "v-track";
import trackEvents from "./ambush/track-events";

Vue.config.productionTip = false

//全局注册接口
Vue.use(api)
// 注册vant
Vue.use(Toast)
Vue.use(Lazyload, {
  lazyComponent: true
});
Vue.use(VTrack, {
  trackEvents, // 埋点事件对象
  trackEnable: {
    //UVPV: true, // 是否开启UVPV统计，v0.8.3新增routeUpdate，即在当前路由参数发生改变时埋点，默认为false
    TONP: true // 是否开启页面停留时长统计，默认为false
  }
})
Vue.directive('point',{
  bind:function (el){
    el.addEventListener('click', function(){
      ambush.user.updatePassword();
    });
  }
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
