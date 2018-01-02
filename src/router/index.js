import Router from 'vue-router'

const Make = r => require.ensure([], () => r(require('../pages/Make.vue')), 'make')
// const Demo = r => require.ensure([], () => r(require('../pages/Demo.vue')), 'demo')
const Demo2 = r => require.ensure([], () => r(require('../pages/Demo2.vue')), 'demo2')

Vue.use(Router)

const router = new Router({
  // path: '/',
  mode: 'history',
  routes: [
    {
      path: '/make',
      name: 'make',
      component: Make
    }, {
      path: '/demo',
      name: 'demo',
      component: Demo2
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
})

// router.beforeResolve(() => {

// })

export default router
