<template>
  <div>
    <Navbar />

    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import Navbar from './components/layout/Navbar.vue';
</script>