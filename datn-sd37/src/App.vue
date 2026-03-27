<!-- <template>
  <div>
    <Header />

    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from './components/layout/Header.vue';
</script> -->

<template>
  <Header />
  <main style="min-height: 80vh;">
    <router-view />
  </main>
  <CartDrawer />
</template>

<script setup lang="ts">
import Header from './components/layout/Header.vue'
import CartDrawer from './components/layout/CartDrawer.vue'
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>