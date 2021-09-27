const routes = [
  { path: '', component: test },
  { path: '/table', component: table },
]

const router = new VueRouter({
  routes
})

const app = new Vue({
  router
}).$mount('#app')
