<template>
  <div class="feature-section py-5 my-5 bg-white" style="font-family: 'Inter', sans-serif;">
    <div class="container-fluid px-4 px-lg-5">
      
      <div class="row g-4 justify-content-center">
        <div class="col-md-4 col-sm-6 mb-4 mb-md-0" v-for="(feat, index) in features" :key="index">
          
          <router-link :to="feat.link" class="feature-card d-block text-decoration-none text-center text-md-start group">
            
            <div class="img-wrapper mb-4 rounded-3 overflow-hidden position-relative" style="aspect-ratio: 16/10; background-color: #f1f1f1;">
              <img :src="feat.image" :alt="feat.title" class="img-fluid w-100 h-100 object-fit-cover transition-transform duration-500">
            </div>

            <h4 class="fw-bold text-dark mb-2 px-1">{{ feat.title }}</h4>
            <p class="text-secondary mb-3 px-1 lh-base" style="font-size: 0.95rem;">{{ feat.description }}</p>
            
            <span class="shop-link fw-medium text-dark d-inline-flex align-items-center px-1 position-relative transition-colors">
              {{ feat.linkLabel }}
              <i class="bi bi-arrow-right ms-2 transition-transform duration-300"></i>
            </span>
          </router-link>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Dữ liệu 3 khối tính năng chính (Việt hóa theo đúng triết lý của Peel)
const features = ref([
  {
    image: 'https://int.buypeel.com/cdn/shop/files/peel_home_hero_desktop_1.jpg?v=1725916053&width=1000', // Ảnh minh họa độ mỏng
    title: 'Ốp lưng siêu mỏng 0.02in',
    description: 'Giữ nguyên cảm giác cầm nắm chân thực như điện thoại trần, không gây cộm hay nặng máy.',
    linkLabel: 'Mua Ốp Lưng Siêu Mỏng',
    link: '/shop-all' // Dẫn đến trang tất cả ốp lưng
  },
  {
    image: 'https://int.buypeel.com/cdn/shop/files/Collection_Apple_WatchCase_83907797-29be-410a-b850-93a830239276.jpg?v=1734633765&width=1000', // Ảnh minh họa thiết kế tối giản
    title: 'Thiết kế tối giản, không logo',
    description: 'Chỉ tập trung vào vẻ đẹp nguyên bản của thiết bị, hoàn toàn loại bỏ các thương hiệu thừa thãi.',
    linkLabel: 'Xem Các Thiết Kế Tối Giản',
    link: '/shop-all' // Cũng dẫn đến trang ốp
  },
  {
    image: 'https://int.buypeel.com/cdn/shop/files/i16_Glass_Features.png?v=1743691200&width=1000', // Ảnh minh họa bảo vệ (Kính cường lực)
    title: 'Bảo vệ màn hình cao cấp',
    description: 'Kính cường lực tràn viền với độ cứng 9H, chống trầy xước và va đập tối ưu.',
    linkLabel: 'Mua Kính Cường Lực',
    link: '/iphone-protectors' // Dẫn đến trang kính cường lực iPhone
  }
])
</script>

<style scoped>
/* Hiệu ứng zoom nhẹ hình ảnh khi di chuột vào khối (group-hover style) */
.feature-card:hover img {
  transform: scale(1.05);
}

/* Hiệu ứng mũi tên dịch chuyển khi di chuột vào khối */
.feature-card:hover .bi-arrow-right {
  transform: translateX(5px);
}

/* Hiệu ứng gạch chân nút giả chuẩn UI Peel */
.shop-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 1.5px;
  bottom: -2px;
  left: 0;
  background-color: #000;
  transition: width 0.3s ease;
}

.feature-card:hover .shop-link::after {
  width: 100%;
}

/* Thêm các helper class cho transition mượt mà */
.transition-transform {
  transition-property: transform;
}
.transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
}
.duration-300 {
  transition-duration: 300ms;
}
.duration-500 {
  transition-duration: 500ms;
}

/* Responsive tốt cho Mobile */
@media (max-width: 576px) {
  .row-cols-2 {
    row-gap: 2rem !important;
  }
  .px-4 {
    padding-left: 1.5rem !important;
    padding-right: 1.5rem !important;
  }
}
</style>