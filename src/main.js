import App from './pages/App'
import router from './router'
// import store from './store'

new Vue({
  el: '#root',
  // store,
  router,
  render: h => h(App),
  renderError (h, err) {
    return h('pre', { style: { color: 'red' }}, err.stack)
  }
})
