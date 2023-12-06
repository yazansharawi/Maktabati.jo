import {  createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

// import { useAuthGuard } from '../../middleware/guards';


// const guards = useAuthGuard();


const routes= [
  {
    path: '/',
    name: 'HomePage',
		component: () => import('@/pages/home-page.vue'),
    meta: {
      title: 'HomePage',
      requiresAuth: true, 
    },
	},
  {
    path: '/categories',
    name: 'CategoriesPage',
		component: () => import('@/pages/categories-page.vue'),
    meta: {
      title: 'CategoriesPage',
      requiresAuth: true, 
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
      title: 'BookOverView',
      requiresAuth: true, 
    },
    props: true,
	},
  {
    path: '/user-presona',
    name: 'UserPresona',
		component: () => import('@/pages/User-presona.vue'),
    meta: {
      title: 'UserPresona',
      requiresAuth: true, 
    },
    // beforeEnter: (to, from, next) => {
    //   if (guards.isAuthenticated() && guards.isOTPVerified()) {
    //     next();
    //   }
    // },
	},
  {
    path: '/otp/:uuid',
    name: 'userOtp',
    component: () => import('@/pages/otp-page.vue'),
    meta: {
      title: 'User Verification',
      requiresAuth: true, 
    },
    props: true,
  },
  {
    path: '/shop',
    name: 'ShopPage',
		component: () => import('@/pages/shop-page.vue'),
    meta: {
      title: 'ShopPage',
      requiresAuth: true, 
    },
	},
  {
    path: '/forgetPassword',
    name: 'forgetPasswordPage',
		component: () => import('@/pages/forget-password-page.vue'),
    meta: {
      title: 'Forget Password Page',
    },
	},
  {
    path: '/orders',
    name: 'Orders',
		component: () => import('@/pages/orders-page.vue'),
    meta: {
      title: 'OrdersPage'
    },
    path: '/ownerDashboard',
    name: 'ownerDashboard',
		component: () => import('@/pages/owner-dashboard.vue'),
    meta: {
      title: 'Owner Dashboard',
      requiresAuth: true, 
    },
    // beforeEnter: (to, from, next) => {
    //   if (guards.isAuthenticated() && guards.isOwner()) {
    //     next();
    //   }
    // },
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
    next('/login');
  } else {
    next();
  }
});


export default router;