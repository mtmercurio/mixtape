import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Mix from '../views/Mix.vue';
import Codes from '../views/Codes.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/mix',
    name: 'Mix',
    component: Mix,
  },
  {
    path: '/codes',
    name: 'Codes',
    component: Codes,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
