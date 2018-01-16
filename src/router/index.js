import Router from 'vue-router'
import Make from '../pages/Make'
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
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
})

// router.beforeResolve(() => {

// })

export default router
