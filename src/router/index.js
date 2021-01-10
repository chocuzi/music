import Vue from 'vue'
import VueRouter from 'vue-router'
// import App from '@/App.vue'
import Home from '@/views/Home.vue'
import Recommend from '@/views/Recommend.vue'
import Hot from '@/views/Hot.vue'
import Search from '@/views/Search.vue'
import PlayList from '@/components/PlayList.vue'
// import App from '@/App.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      isRefresh: true //此组件不需要被缓存
    },
    // redirect: "/home",
    redirect: "/recommend",
    children: [
      {
        path: '/recommend',
        name: 'Recommend',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () => import(/* webpackChunkName: "about" */ '@/views/Recommend.vue')
        component: Recommend,
        // alias:'/',
      },
      {
        path: "/hot",
        name: "Hot",
        component: Hot
      }, {
        path: "/search",
        name: "Search",
        component: Search
      }
    ]
  }
  , {
    path: "/playlist",
    name: "PlayList",
    component: PlayList,
    children: [
      { path: '/playlist/:id', props: true },
    ]
  },



]

const router = new VueRouter({
  routes
})

export default router
