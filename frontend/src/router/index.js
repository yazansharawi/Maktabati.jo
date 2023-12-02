import {  createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

const routes= [
  {
    path: '/',
    name: 'HomePage',
		component: () => import('@/pages/home-page.vue'),
    meta: {
      title: 'HomePage'
    },
	},
  {
    path: '/categories',
    name: 'CategoriesPage',
		component: () => import('@/pages/categories-page.vue'),
    meta: {
      title: 'CategoriesPage'
    },
	},
  {
    path: '/signup',
    name: 'SignUpPage',
		component: () => import('@/pages/sign-up-page.vue'),
    meta: {
      title: 'SignUpPage'
    },
	},
  {
    path: '/login',
    name: 'logInPage',
		component: () => import('@/pages/login-page.vue'),
    meta: {
      title: 'logInPage'
    },
	},
  {
    path: '/book-overview/:id',
    name: 'BookOverView',
		component: () => import('@/pages/book-overview.vue'),
    meta: {
      title: 'BookOverView'
    },
    props: true,
	},
  {
    path: '/user-presona',
    name: 'UserPresona',
		component: () => import('@/pages/User-presona.vue'),
    meta: {
      title: 'UserPresona'
    },
	},
  {
    path: '/otp',
    name: 'userOtp',
		component: () => import('@/pages/otp-page.vue'),
    meta: {
      title: 'User Verification'
    },
	},
  {
    path: '/shop',
    name: 'ShopPage',
		component: () => import('@/pages/shop-page.vue'),
    meta: {
      title: 'ShopPage'
    },
	},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to) => {
  const routeName = to.name;
  const metaTitle = routeName ? `${routeName}` : 'Your App Name';
  document.title = metaTitle;
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !store.getters.isAuthenticated) {
    next('/login-page');
  } else {
    next();
  }
});


export default router;