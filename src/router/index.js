import Router from 'vue-router'

const Home = r => require.ensure([], () => r(require('../pages/Home.vue')), 'home')

Vue.use(Router)

const router = new Router({
  path: '/',
  mode: 'history',
  routes: [
    {
      path: '',
      name: 'home',
      component: Home
    }
  ]
})

export default router
