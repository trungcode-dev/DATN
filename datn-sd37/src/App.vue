<template>
  <div>
    <Header />

    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from './components/layout/Header.vue';
</script>