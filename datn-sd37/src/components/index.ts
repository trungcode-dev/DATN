import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/HomeView.vue';
import CategoryView from './views/CategoryView.vue';

const routes = [
  {
    path: '/', // Đường dẫn gốc (Trang chủ)
    name: 'Home',
    component: HomeView
  },
  {
    path: '/category/:slug', // Tham số động :slug sẽ nhận giá trị "iphone-17-pro-max"
    name: 'Category',
    component: CategoryView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;