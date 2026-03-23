<template>
  <div class="card h-100 border-0 text-dark">
    <div class="bg-light rounded-4 d-flex justify-content-center align-items-center p-4 mb-3" style="aspect-ratio: 1/1;">
      <img :src="item.image" class="img-fluid" style="max-height: 80%; object-fit: contain;" :alt="item.name">
    </div>
    
    <div class="card-body p-0">
      <p class="text-muted small mb-1">{{ item.typeName }}</p>
      <h6 class="card-title fw-bold mb-2" style="font-size: 15px; line-height: 1.4;">{{ item.name }}</h6>
      
      <div class="d-flex gap-2 align-items-center mb-3">
        <span class="text-danger fw-bold fs-5">{{ item.price }}</span>
        <span class="text-muted text-decoration-line-through small">{{ item.oldPrice }}</span>
      </div>

      <div v-if="item.colors && item.colors.length > 0" class="d-flex gap-2 mb-2">
        <div v-for="(color, index) in item.colors" :key="index" :style="{ backgroundColor: color }" class="color-dot rounded-circle border border-muted" style="width: 15px; height: 15px;"></div>
        <span v-if="item.colors.length > 3" class="text-muted small">+{{ item.colors.length - 3 }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Nhận dữ liệu truyền từ file cha CategoryView xuống
defineProps({
  item: {
    type: Object,
    required: true
  }
});
</script>