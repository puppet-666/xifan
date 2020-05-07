import Vue from 'vue'
import VueRouter from 'vue-router'
import { Toast } from 'vant';

Vue.use(VueRouter).use(Toast)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
  },{
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue'),
  },{
    path: '/user',
    name: 'user',
    component: () => import('../views/User.vue'),
    meta: {
      keepAlive: true
    },
    children:[
      {
        path:"index",
        name:'index',
        component:() => import('../views/Index.vue'),
        meta: {
          keepAlive: true
        }
      },{
        path:"collect",
        component:() => import('../views/Collect.vue')
      },{
        path:"note",
        component:() => import('../views/Note.vue')
      },{
        path:"info",
        component:() => import('../views/Info.vue')
      }
    ]
  },{
    path:"/food/:id",
    name:"food",
    component:() => import('../views/FoodInfo.vue')
  },{
    path:"/search",
    name:"search",
    component:() => import('../views/SearchInfo.vue')
  },{
    path:"*",
    name:"notFound",
    component:() => import('../views/NotFound')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } 
  }
})

// 处理某段chunk未能加载的error
router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace(targetPath);
  }
});

// 全局路由守卫，登录鉴权
router.beforeEach((to, from, next) => {
  const user = JSON.parse(window.localStorage.getItem("user"));
  // 前往登录页自己就放行
  if (to.path == '/') {
    next();
  }
  else if(to.path == '/login'){
    next();
  }
  else if(to.path == '/register'){
    next();
  } 
  else {
    // 没登录
    if (!user) {
      Toast.fail('您还没有登录')
      next('/');
    } else {
      // 已登录放行
      next()
    }
  }
})
export default router
