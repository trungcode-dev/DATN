<template>
  <div class="hero-carousel-wrapper mt-3 px-3 px-md-4">
    <div class="carousel-inner-box position-relative rounded-4 overflow-hidden w-100 mx-auto shadow-sm" style="max-width: 1400px; height: 600px;">
      
      <div v-for="(slide, index) in slides" :key="index"
           class="carousel-item-custom position-absolute w-100 h-100"
           :class="{ 'active': currentIndex === index }">
        
        <div class="bg-image w-100 h-100" :style="{ backgroundImage: `url(${slide.image})` }"></div>
        <div class="overlay position-absolute top-0 start-0 w-100 h-100 bg-dark" style="opacity: 0.25;"></div>

        <div class="content-box position-absolute top-50 start-50 translate-middle text-center w-100 px-3 z-2">
          <h1 class="text-white fw-bold mb-3 display-4 title-shadow" v-html="slide.title" style="letter-spacing: -1px;"></h1>
          <p class="text-white fs-5 mb-4 mx-auto desc-shadow" style="max-width: 650px;">{{ slide.subtitle }}</p>
          <router-link :to="slide.link" class="btn btn-dark text-white px-4 py-3 fw-bold rounded-2 shadow-lg custom-btn">
            {{ slide.btnText }}
          </router-link>
        </div>
      </div>

      <div class="indicators-wrapper position-absolute bottom-0 start-50 translate-middle-x mb-4 d-flex gap-2 z-3">
        <button v-for="(slide, index) in slides" :key="'ind-'+index"
                class="indicator-btn border-0 rounded-pill"
                :class="{ 'active': currentIndex === index }"
                @click="goToSlide(index)"
                aria-label="Chuyển slide">
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const currentIndex = ref(0)
const intervalId = ref<any>(null)

// Dữ liệu các Slide (Đã việt hóa nội dung dựa trên triết lý của Peel)
const slides = ref([
  {
    image: 'https://int.buypeel.com/cdn/shop/files/Base_Station_Hero_2_2x_8eb14032-17a4-44df-b4d6-84e1fc3f59fa.jpg?v=1730999516&width=2000',
    title: 'Một Bộ Sạc.<br>Không Còn Lộn Xộn.',
    subtitle: 'Trạm sạc 3-trong-1 siêu gọn gàng cho điện thoại, đồng hồ và tai nghe của bạn.',
    btnText: 'MUA NGAY',
    link: '/accessories'
  },
  {
    image: 'https://int.buypeel.com/cdn/shop/files/peel_home_hero_desktop_1.jpg?v=1725916053&width=2000',
    title: 'Ốp Lưng Siêu Mỏng.<br>Bảo Vệ Tối Ưu.',
    subtitle: 'Giữ nguyên vẻ đẹp nguyên bản của thiết bị với ốp lưng siêu mỏng LATRA.',
    btnText: 'XEM ỐP LƯNG',
    link: '/shop-all'
  },
  {
    image: 'https://int.buypeel.com/cdn/shop/files/i16_Glass_Features.png?v=1743691200&width=2000',
    title: 'Kính Cường Lực<br>Trong Suốt Hoàn Hảo.',
    subtitle: 'Bảo vệ màn hình tràn viền, mang lại cảm giác vuốt chạm như màn hình gốc.',
    btnText: 'MUA KÍNH CƯỜNG LỰC',
    link: '/iphone-protectors'
  }
])

// Logic chuyển sang Slide tiếp theo
const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.value.length
}

// Logic khi người dùng bấm trực tiếp vào chấm tròn
const goToSlide = (index: number) => {
  currentIndex.value = index
  resetInterval() // Bấm thủ công thì reset lại bộ đếm auto
}

// Reset bộ đếm thời gian
const resetInterval = () => {
  if (intervalId.value) clearInterval(intervalId.value)
  intervalId.value = setInterval(nextSlide, 5000)
}

// Chạy bộ đếm tự động 5s/lần khi load component
onMounted(() => {
  intervalId.value = setInterval(nextSlide, 5000)
})

// Dọn dẹp bộ nhớ khi chuyển sang trang khác
onUnmounted(() => {
  if (intervalId.value) clearInterval(intervalId.value)
})
</script>

<style scoped>
.hero-carousel-wrapper {
  font-family: 'Inter', -apple-system, sans-serif;
}

.carousel-inner-box {
  background-color: #f4f4f4;
}

.bg-image {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: transform 6s ease; /* Hiệu ứng zoom nhẹ background */
}

/* HIỆU ỨNG FADE CỦA SLIDE */
.carousel-item-custom {
  opacity: 0;
  transition: opacity 0.8s ease-in-out;
  pointer-events: none; /* Khóa click khi bị ẩn */
}

.carousel-item-custom.active {
  opacity: 1;
  pointer-events: auto; /* Mở click khi hiển thị */
}

/* Hiệu ứng zoom background khi active */
.carousel-item-custom.active .bg-image {
  transform: scale(1.03); 
}

/* TEXT SHADOW ĐỂ CHỮ NỔI BẬT TRÊN MỌI NỀN */
.title-shadow {
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}
.desc-shadow {
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

/* NÚT BẤM */
.custom-btn {
  font-size: 0.95rem;
  letter-spacing: 1px;
  background-color: #000000;
  transition: all 0.3s ease;
}
.custom-btn:hover {
  background-color: #333333;
  transform: translateY(-2px);
}

/* INDICATORS (Chấm chuyển ảnh) */
.indicator-btn {
  width: 8px;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 0;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 1px 3px rgba(0,0,0,0.3);
}

.indicator-btn:hover {
  background-color: rgba(255, 255, 255, 0.8);
}

/* Điểm Active sẽ kéo dài ra thành hình viên thuốc */
.indicator-btn.active {
  width: 24px;
  background-color: #ffffff;
}

/* Đảm bảo Responsive tốt trên Mobile */
@media (max-width: 768px) {
  .carousel-inner-box {
    height: 450px !important;
    border-radius: 12px !important;
  }
  .display-4 {
    font-size: 2.2rem;
  }
}
</style>