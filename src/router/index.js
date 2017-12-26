import Router from 'vue-router'

const Home = r => require.ensure([], () => r(require('../pages/Home.vue')), 'home')

Vue.use(Router)

const router = new Router({
  path: '/',
  mode: 'history',
  routes: [
    {
      path: 'compression',
      name: 'compression',
      component: Home
    },
    {
      path: 'cut',
      name: 'cut',
      component: Home
    },
    {
      path: 'editor',
      name: 'editor',
      component: Home
    },
    {
      path: 'video',
      name: 'video',
      component: Home
    },
    {
      path: 'gifTool',
      name: 'gifTool',
      component: Home
    },
    {
      path: 'demo',
      name: 'demo',
      component: Home
    }
  ]
})

export default router
