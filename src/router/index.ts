import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
		path: '/',
		redirect: '/home',
  },
  {
		path: '/home',
		name: 'Home',
    component: () => import('@/views/Home/home.vue'),
    meta: {
      keepAlive: true,
      scrollTop: 0,
    }
	},
  {
		path: '/setting',
		name: 'Setting',
		component: () => import('@/views/Setting/setting.vue')
	},
];

const router = new VueRouter({
  routes,
});

export default router;
