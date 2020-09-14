import Vue from 'vue'
import Router from 'vue-router'
import login from "@/page/login"
import index from "@/components/index"
import home from "@/page/home"


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/home'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      component: index,
      meta: { title: '自述文件' },
      children: [
        {
          path: '/home',
          component: home,
          meta: { title: '首页' }
        }
      ]
    }
  ]
})
