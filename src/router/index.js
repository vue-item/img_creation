import Router from 'vue-router'
import Make from '../pages/Make'
import Demo from '../pages/Demo'
// const Make = r => require.ensure([], () => r(require('')), 'make')
Vue.use(Router)

const router = new Router({
  // path: '/',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'make',
      component: Make
    },
    {
      path: '/demo',
      name: 'demo',
      component: Demo
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
})

// router.beforeResolve(() => {

// })

export default router
