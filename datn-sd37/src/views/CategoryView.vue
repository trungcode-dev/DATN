<template>
  <div class="category-view pb-5" style="font-family: 'Inter', sans-serif;">
    <div class="hero-section" style="background-color: #f0f7f8; padding: 60px 0;">
      <div class="container-fluid px-4 px-xl-5">
        <div class="row align-items-center">
          <div class="col-md-6 text-center text-md-start mb-4 mb-md-0 pl-md-5">
            <h1 class="fw-bold mb-3 display-5 text-dark" style="letter-spacing: -1px;" v-html="heroData.title"></h1>
            <p v-if="heroData.desc" class="text-secondary mb-4 fs-5">{{ heroData.desc }}</p>
            <div class="d-flex justify-content-center justify-content-md-start gap-4 mt-4">
              <div class="text-center" v-for="(feat, index) in heroData.features" :key="index">
                <i :class="['bi', feat.icon, 'fs-3']" style="color: #2b7074 !important;"></i>
                <div class="small fw-medium mt-1 text-dark">{{ feat.text }}</div>
              </div>
            </div>
          </div>
          <div class="col-md-6 text-center">
            <img :src="heroData.img" alt="Banner Danh Mục" class="img-fluid rounded-4" style="max-height: 380px;">
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid px-4 px-xl-5 mt-5">
      <div class="row">
        <div class="col-lg-3 d-none d-lg-block pe-5">
          <FilterSidebar 
            :types="dynamicTypes" :models="dynamicPhoneModels" :features="dynamicFeatures"
            v-model:selectedTypes="selectedTypes" v-model:selectedModels="selectedModels" v-model:selectedFeatures="selectedFeatures"
          />
        </div>

        <div class="col-lg-9">
          <div class="d-flex justify-content-between align-items-center mb-4 pb-2">
            <span class="text-dark fw-medium small">{{ filteredProducts.length }} sản phẩm</span>
            <div class="d-flex align-items-center gap-2">
              <span class="text-dark fw-medium small">Sắp xếp:</span>
              <select class="form-select border-1 border-dark-subtle fw-medium py-1 text-dark rounded-1" style="width: auto; font-size: 0.9rem;" v-model="sortBy">
                <option value="Nổi Bật">Nổi Bật</option>
                <option value="Giá: Thấp đến Cao">Giá: Thấp đến Cao</option>
                <option value="Giá: Cao đến Thấp">Giá: Cao đến Thấp</option>
              </select>
            </div>
          </div>

          <div v-if="filteredProducts.length === 0" class="text-center py-5">
            <h5 class="text-muted">Không tìm thấy sản phẩm phù hợp.</h5>
            <button class="btn btn-outline-dark mt-3" @click="clearFilters">Xóa Bộ Lọc</button>
          </div>

          <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4" v-else>
            <div class="col" v-for="product in paginatedProducts" :key="product.id">
              <ProductCard :product="product" @add-to-cart="handleAddToCart" @quick-view="handleQuickView" />
            </div>
          </div>
          
          <div class="d-flex justify-content-center mt-5 pt-3 gap-3" v-if="totalPages > 1">
             <a href="#" v-for="page in totalPages" :key="page" @click.prevent="currentPage = page" 
                :class="{'fw-bold': currentPage === page, 'text-dark text-decoration-none': true, 'text-muted': currentPage !== page}">
                {{ page }}
             </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

import { type Product, productsDB } from '../components/data/db'
import FilterSidebar from '../components/category/FilterSidebar.vue'
import ProductCard from '../components/category/ProductCard.vue'

const route = useRoute()

const pageInfo = computed(() => {
  const path = route.path.toLowerCase()
  return {
    brand: path.indexOf('iphone') !== -1 ? 'Apple' : 
           path.indexOf('samsung') !== -1 ? 'Samsung' : 
           path.indexOf('pixel') !== -1 ? 'Google' : 'All',
    isPrivacy: path.indexOf('privacy') !== -1
  }
})

// 1. ĐỊNH NGHĨA TYPE CHO HERO BANNER (FIX LỖI feat.text)
interface Feature {
  icon: string;
  text: string;
}

interface HeroData {
  title: string;
  desc: string;
  img: string;
  features: Feature[];
}

const heroData = computed<HeroData>(() => {
  const { brand, isPrivacy } = pageInfo.value
  const titleType = isPrivacy ? 'Kính Chống Nhìn Trộm' : 'Kính Cường Lực'
  const brandName = brand === 'All' ? '' : (brand === 'Apple' ? 'iPhone' : brand)
  
  return {
    title: brand === 'All' ? `Tất Cả ${titleType}` : `${titleType}<br>${brandName}`,
    desc: 'Bảo vệ màn hình cao cấp cho điện thoại của bạn.',
    img: isPrivacy ? 'https://int.buypeel.com/cdn/shop/files/callout_privacy-glassArtboard-1.png?v=1744605416&width=750' : 'https://int.buypeel.com/cdn/shop/files/Peel-Glass_01_9c62a34e-970f-4ed9-8977-ef63e8ffca4b.png?v=1744834446&width=750',
    features: [
      { icon: isPrivacy ? 'bi-eye-slash' : 'bi-hammer', text: isPrivacy ? 'Chống Nhìn Trộm 28°' : 'Độ Cứng 9H' },
      { icon: 'bi-droplet', text: 'Độ Nét HD' },
      { icon: 'bi-layers', text: 'Vừa Vặn Tuyệt Đối' }
    ]
  }
})

// 2. ÉP KIỂU <Product[]> CHO SẢN PHẨM (FIX LỖI product.id)
const baseProducts = computed<Product[]>(() => {
  const { brand, isPrivacy } = pageInfo.value
  const targetType = isPrivacy ? 'Kính Chống Nhìn Trộm' : 'Kính Cường Lực'
  
  return productsDB.filter(p => {
    if (!p.type || !p.type.indexOf(targetType)) return false; 
    if (brand !== 'All' && p.category !== brand) return false; 
    return true;
  })
})

const createFilter = (key: keyof Product) => {
  const counts: Record<string, number> = {}
  baseProducts.value.forEach(p => {
    const val = p[key]
    if (!val) return;
    const values = Array.isArray(val) ? val as string[] : [val as string]
    values.forEach(v => counts[v] = (counts[v] || 0) + 1)
  })
  return Object.keys(counts).map(name => ({ name, count: counts[name] }))
}

const dynamicTypes = computed(() => createFilter('type'))
const dynamicPhoneModels = computed(() => createFilter('models'))
const dynamicFeatures = computed(() => createFilter('features'))

const selectedTypes = ref<string[]>([])
const selectedModels = ref<string[]>([])
const selectedFeatures = ref<string[]>([])
const sortBy = ref('Nổi Bật')
const currentPage = ref(1)

const clearFilters = () => { selectedTypes.value = []; selectedModels.value = []; selectedFeatures.value = []; }

// Ép kiểu <Product[]>
const filteredProducts = computed<Product[]>(() => {
  let res = baseProducts.value
  if (selectedTypes.value.length) res = res.filter(p => p.type && selectedTypes.value.includes(p.type))
  if (selectedModels.value.length) res = res.filter(p => p.models && p.models.some(m => selectedModels.value.includes(m)))
  if (selectedFeatures.value.length) res = res.filter(p => p.features && p.features.some(f => selectedFeatures.value.includes(f)))
  
  if (sortBy.value === 'Giá: Thấp đến Cao') res.sort((a,b) => a.price - b.price)
  if (sortBy.value === 'Giá: Cao đến Thấp') res.sort((a,b) => b.price - a.price)
  return res
})

const itemsPerPage = 12
const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage))

// Ép kiểu <Product[]>
const paginatedProducts = computed<Product[]>(() => filteredProducts.value.slice((currentPage.value - 1) * itemsPerPage, currentPage.value * itemsPerPage))

watch(pageInfo, () => { clearFilters(); currentPage.value = 1 })

const handleAddToCart = (product: Product) => { console.log('Thêm giỏ hàng:', product.name) }
const handleQuickView = (product: Product) => { console.log('Xem nhanh:', product.name) }
</script>