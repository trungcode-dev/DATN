<template>
  <div class="hero-banner d-flex align-items-center justify-content-center text-center position-relative overflow-hidden" style="background-color: #f4f4f4; min-height: 85vh;">
    <div class="container position-relative z-2">
      <h1 class="display-3 fw-bold text-dark mb-3" style="letter-spacing: -2px;">Ốp lưng mỏng nhất.<br>Bảo vệ tốt nhất.</h1>
      <p class="fs-5 text-secondary mb-5">Giữ nguyên vẻ đẹp nguyên bản của thiết bị với ốp lưng siêu mỏng LATRA.</p>
      <div class="d-flex gap-3 justify-content-center">
        <router-link to="/iphone-protectors" class="btn btn-dark rounded-pill px-5 py-3 fw-bold">Mua cho iPhone</router-link>
        <router-link to="/samsung-protectors" class="btn btn-outline-dark rounded-pill px-5 py-3 fw-bold bg-white">Mua cho Samsung</router-link>
      </div>
    </div>
    <img src="https://int.buypeel.com/cdn/shop/files/peel_home_hero_desktop_1.jpg" alt="Hero Phone" class="position-absolute bottom-0 start-50 translate-middle-x img-fluid mix-blend-multiply" style="max-height: 50vh; opacity: 0.9;">
  </div>
</template>

<style scoped>
.hero-banner { font-family: 'Inter', sans-serif; }
.mix-blend-multiply { mix-blend-mode: multiply; }
</style>