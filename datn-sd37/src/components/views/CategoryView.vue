<template>
  <div class="container mt-5">
    <template v-if="currentProduct">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><router-link to="/">Trang chủ</router-link></li>
          <li class="breadcrumb-item active" aria-current="page">{{ currentProduct.name }}</li>
        </ol>
      </nav>

      <h2 class="mb-4 fw-bold">{{ currentProduct.name }}</h2>
      
      <div class="row mt-4">
        <div class="col-md-4">
          <div class="card shadow-sm border-0">
            <img :src="currentProduct.image" class="card-img-top p-3" alt="Case Image">
            <div class="card-body text-center">
              <h5 class="card-title fw-bold">{{ currentProduct.name }}</h5>
              <p class="card-text text-muted small">{{ currentProduct.description }}</p>
              <h5 class="text-danger fw-bold mb-3">{{ currentProduct.price }}</h5>
              <button class="btn btn-dark w-100 rounded-pill">Thêm vào giỏ</button>
            </div>
          </div>
        </div>
      </div>
    </template>

    <div v-else class="text-center mt-5">
      <h2 class="fw-bold">Không tìm thấy sản phẩm! 😢</h2>
      <p class="text-muted">Sản phẩm bạn tìm (<strong>{{ route.params.slug }}</strong>) không tồn tại hoặc đã hết hàng.</p>
      <router-link to="/" class="btn btn-outline-dark mt-3">Quay lại trang chủ</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// 1. Tạo một "Kho dữ liệu" giả lập chứa 2 sản phẩm của bạn
const productsDB = [
  {
    slug: 'iphone-17-pro-max',
    name: 'Super Thin Case cho iPhone 17 Pro Max',
    price: '$39.00',
    description: 'Bảo vệ camera siêu tốt, viền mỏng nhẹ cho bản Max.',
    image: 'https://placehold.co/400x400/222222/ffffff?text=iPhone+17+Pro+Max'
  },
  {
    slug: 'iphone-17-pro',
    name: 'Super Thin Case cho iPhone 17 Pro',
    price: '$35.00',
    description: 'Thiết kế tối giản, giữ nguyên form dáng bản Pro.',
    image: 'https://placehold.co/400x400/eeeeee/333333?text=iPhone+17+Pro'
  }
];

// 2. Hàm này sẽ tự động tìm trong Kho dữ liệu xem có sản phẩm nào
// trùng với cái "slug" trên thanh URL không.
const currentProduct = computed(() => {
  return productsDB.find(product => product.slug === route.params.slug);
});
</script>