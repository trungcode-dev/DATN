<template>
  <div>
    <Header />

    <main>
      <LoginView></LoginView>
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from './components/layout/Header.vue';
import LoginView from './views/LoginView.vue';
</script>