// import { createRouter, createWebHistory } from 'vue-router';
// import HomeView from '@/views/HomeView.vue';

// const routes = [
//   {
//     path: '/', // Đường dẫn gốc (Trang chủ)
//     name: 'Home',
//     component: HomeView
//   },
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes
// });

// export default router;

import { createRouter, createWebHistory } from 'vue-router'

// Import các trang (Views)
import HomeView from '../views/HomeView.vue'
import CategoryView from '../views/CategoryView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      // Đường dẫn cho Chi tiết sản phẩm (Cái mà bạn đang click không được)
      path: '/product/:id',
      name: 'product-detail',
      component: ProductDetailView
    },
    {
      // Đường dẫn linh hoạt cho các trang Danh mục (shop-all, iphone-protectors,...)
      path: '/:categorySlug',
      name: 'category',
      component: CategoryView
    }
  ],
  // Tính năng UX cực kỳ quan trọng: Tự động cuộn lên đầu trang khi chuyển trang
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

export default router