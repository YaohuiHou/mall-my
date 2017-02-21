import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/Index'
import Home from '../views/Home'
import ColleatsView from '../views/Colleats'
import News from '../views/News'
import Order from '../views/Order'
import Detail from '../views/Detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/ColleatsView',
      name: 'ColleatsView',
      component: ColleatsView
    },
    {
      path: '/News',
      name: 'News',
      component: News
    },
    {
      path: '/Order',
      name: 'Order',
      component: Order
    },
    {
      path: '/Detail/:id',
      name: 'Detail',
      component: Detail
    }
  ]
})
