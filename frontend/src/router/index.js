import {  createRouter, createWebHistory } from 'vue-router';

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
    path: '/categories-page',
    name: 'CategoriesPage',
		component: () => import('@/pages/categories-page.vue'),
    meta: {
      title: 'CategoriesPage'
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
    path: '/user-presona',
    name: 'UserPresona',
		component: () => import('@/pages/User-presona.vue'),
    meta: {
      title: 'UserPresona'
    },
	},
  {
    path: '/shop-page',
    name: 'ShopPage',
		component: () => import('@/pages/shop-page.vue'),
    meta: {
      title: 'ShopPage'
    },
	},
  {
    path: '/orders',
    name: 'Orders',
		component: () => import('@/pages/orders-page.vue'),
    meta: {
      title: 'OrdersPage'
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


export default router;