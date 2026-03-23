import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';

const routes = [
  {
    path: '/', // Đường dẫn gốc (Trang chủ)
    name: 'Home',
    component: HomeView
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;