<template>
  <div class="mb-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5 class="fw-bold mb-0">{{ title }}</h5>
      <span class="fs-4 lh-1">{{ icon }}</span>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  icon: { type: String, default: '+' }
});
</script>