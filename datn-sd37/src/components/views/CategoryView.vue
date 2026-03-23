<template>
  <div class="container-fluid px-5">
    
    <CategoryBanner />

    <div class="row mt-5 pt-3">
      
      <div class="col-lg-3 col-md-4 d-none d-md-block">
        <FilterSidebar @filter-changed="handleFilterChange" />
      </div>

      <div class="col-lg-9 col-md-8 text-dark">
        <div class="d-flex justify-content-between align-items-center mb-5 pb-2">
          <span class="fw-bold fs-5">{{ filteredProducts.length }} products</span>
          <span class="text-muted">Sort by: Featured <i class="bi bi-chevron-down ms-1"></i></span>
        </div>

        <div class="row g-5">
          <div class="col-lg-4 col-md-6" v-for="product in filteredProducts" :key="product.id">
            <ProductCard :item="product" />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import CategoryBanner from '../CategoryBanner.vue';
import FilterSidebar from '../FilterSidebar.vue';
import ProductCard from '../ProductCard.vue';
import { productsDB } from '../data/cases'; // Import dữ liệu

// 1. Tạo biến để lưu lại các tiêu chí lọc đang được chọn
const activeFilters = ref({
  types: [] as string[],
  colors: [] as string[],
  caseFeatures: [] as string[],
  screenFeatures: [] as string[]
});

// 2. Hàm này hứng dữ liệu khi Sidebar bấm checkbox
const handleFilterChange = (filters: any) => {
  activeFilters.value = filters;
};

// 3. TỰ ĐỘNG LỌC SẢN PHẨM: Khi activeFilters thay đổi, danh sách này tự tính toán lại
const filteredProducts = computed(() => {
  return productsDB.filter((product) => {
    // Nếu mảng rỗng (không tích ô nào) thì coi như khớp hết (return true)
    
    // Lọc theo Loại
    const matchType = activeFilters.value.types.length === 0 || activeFilters.value.types.includes(product.type);
    
    // Lọc theo Màu (Chỉ kiểm tra cho ốp lưng, nếu màu sản phẩm có chứa trong mảng màu được tích)
    const matchColor = activeFilters.value.colors.length === 0 || 
                      (product.colors && product.colors.some(c => activeFilters.value.colors.includes(c)));
    
    // Lọc theo Case Features
    const matchCaseFeature = activeFilters.value.caseFeatures.length === 0 ||
                            (product.features && activeFilters.value.caseFeatures.every(f => product.features.includes(f)));

    // Lọc theo Screen Features
    const matchScreenFeature = activeFilters.value.screenFeatures.length === 0 ||
                              (product.features && activeFilters.value.screenFeatures.every(f => product.features.includes(f)));
    
    // Phải khớp TẤT CẢ các tiêu chí lọc mới được hiện ra
    return matchType && matchColor && matchCaseFeature && matchScreenFeature;
  });
});
</script>