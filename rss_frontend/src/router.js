import Vue from 'vue';
import Router from 'vue-router';

import Login from '@/components/Login';
import Dashboard from '@/components/Dashboard';
import ShowFeeds from '@/components/ShowFeeds';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Login,
    }, {
      path: '/dashboard',
      component: Dashboard,
      name: 'dashboard',
    },  {
      path: '/dashboard/:rssSiteName',
      component: ShowFeeds,
      name: 'showfeeds',
    }
  ]
})

export default router;