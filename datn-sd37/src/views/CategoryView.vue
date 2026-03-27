<template>
  <div class="category-page py-5">
    <div class="container-fluid px-4 px-xl-5">
      <div class="row">
        <div class="col-lg-3">
          <FilterSidebar 
            :types="dynamicTypes" 
            :models="dynamicPhoneModels"
            v-model:selectedTypes="selectedTypes"
            v-model:selectedModels="selectedModels"
          />
        </div>

        <div class="col-lg-9">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <span class="text-secondary">{{ sortedProducts.length }} sản phẩm</span>
            
            <div class="d-flex align-items-center gap-2">
              <span class="small fw-bold text-uppercase">Sort by:</span>
              <select v-model="sortBy" class="form-select form-select-sm border-0 shadow-none w-auto fw-medium">
                <option value="featured">Featured</option>
                <option value="price-asc">Price, low to high</option>
                <option value="price-desc">Price, high to low</option>
                <option value="alpha-asc">Alphabetically, A-Z</option>
                <option value="alpha-desc">Alphabetically, Z-A</option>
              </select>
            </div>
          </div>

          <div class="row g-4">
            <div class="col-6 col-md-4 col-xl-3" v-for="product in sortedProducts" :key="product.id">
              <ProductCard :product="product" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { type Product, productsDB } from '../data/db'
import FilterSidebar from '../components/category/FilterSidebar.vue'
import ProductCard from '../components/category/ProductCard.vue'

const route = useRoute()

// --- 1. PHÂN TÍCH URL ---
const pageInfo = computed(() => {
  const path = route.path.toLowerCase()
  return {
    isCharging: path.includes('charging'),
    isAccessories: path.includes('accessories'),
    isScreen: path.includes('screen'),
    isPrivacy: path.includes('privacy'),
    brand: path.includes('iphone') ? 'Apple' : path.includes('samsung') ? 'Samsung' : 'All'
  }
})

// --- 2. DỮ LIỆU GỐC THEO TRANG (FIX LỖI ÉP KIỂU) ---
const baseProducts = computed<Product[]>(() => {
  const { isCharging, isAccessories, isScreen, brand } = pageInfo.value

  const filtered = productsDB.filter(p => {
    if (isCharging && p.category !== 'Charging') return false
    if (isAccessories && p.category !== 'Accessories') return false
    if (isScreen && (!p.type || !p.type.includes('Screen'))) return false
    if (!isCharging && !isAccessories && brand !== 'All' && p.category !== brand) return false
    return true
  })
  
  // Ép kiểu an toàn để tránh lỗi "Record<string, string>"
  return filtered as unknown as Product[]
})

// --- 3. QUẢN LÝ TRẠNG THÁI LỌC ---
const selectedTypes = ref<string[]>([])
const selectedModels = ref<string[]>([])
const sortBy = ref('featured')

// Tự động tạo dữ liệu cho Sidebar dựa trên sản phẩm thực tế đang có
const dynamicTypes = computed(() => createFilter('type'))
const dynamicPhoneModels = computed(() => createFilter('category'))

function createFilter(key: keyof Product) {
  const counts: Record<string, number> = {}
  baseProducts.value.forEach(p => {
    const val = p[key]
    if (!val) return
    const name = String(val)
    counts[name] = (counts[name] || 0) + 1
  })
  return Object.keys(counts).map(name => ({ name, count: counts[name] }))
}

// --- 4. LOGIC LỌC & SẮP XẾP CHÍNH (FIX LỖI PHÂN LOẠI SAI) ---
const sortedProducts = computed(() => {
  let res = [...baseProducts.value]

  // Lọc theo Type (Ốp siêu mỏng, Kính cường lực...)
  if (selectedTypes.value.length > 0) {
    res = res.filter(p => selectedTypes.value.includes(p.type))
  }

  // Lọc theo Model (iPhone 17, Galaxy S24...)
  if (selectedModels.value.length > 0) {
    res = res.filter(p => selectedModels.value.includes(p.category))
  }

  // Logic Sắp xếp chuẩn
  switch (sortBy.value) {
    case 'price-asc':
      res.sort((a, b) => a.price - b.price); break
    case 'price-desc':
      res.sort((a, b) => b.price - a.price); break
    case 'alpha-asc':
      res.sort((a, b) => a.name.localeCompare(b.name)); break
    case 'alpha-desc':
      res.sort((a, b) => b.name.localeCompare(a.name)); break
    default:
      res.sort((a, b) => b.id - a.id); break // Mới nhất/Nổi bật
  }
  return res
})

// Reset lọc khi chuyển danh mục trên Menu
watch(pageInfo, () => {
  selectedTypes.value = []
  selectedModels.value = []
  sortBy.value = 'featured'
})
</script>