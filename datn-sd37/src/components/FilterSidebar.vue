<template>
  <div class="filter-sidebar pe-4">
    
    <FilterSection title="Type" icon="-">
      <div class="form-check mb-2" v-for="type in filterData.types" :key="type.value">
        <input class="form-check-input" type="checkbox" :id="type.value" :value="type.value" v-model="selectedTypes">
        <label class="form-check-label text-dark" :for="type.value">
          {{ type.label }} <span class="text-muted small">({{ countProductsByType(type.value) }})</span>
        </label>
      </div>
    </FilterSection>

    <hr class="text-muted">

    <FilterSection title="Phone Model" icon="-">
      <div class="form-check mb-2">
        <input class="form-check-input" type="checkbox" id="ip17promax" value="ip17promax" v-model="selectedModels">
        <label class="form-check-label text-dark" for="ip17promax">
          iPhone 17 Pro Max <span class="text-muted small">({{ productsDB.length }})</span>
        </label>
      </div>
    </FilterSection>

    <hr class="text-muted">

    <FilterSection title="Color" icon="-">
      <div class="color-picker-grid d-flex flex-wrap gap-3">
        <button v-for="color in filterData.colors" :key="color.value" :style="{ backgroundColor: color.value }" class="color-dot rounded-circle border border-2 position-relative" :class="{ 'active-border': selectedColors.includes(color.value) }" :title="color.label" @click="toggleColorFilter(color.value)">
          <i v-if="selectedColors.includes(color.value)" class="bi bi-check text-white position-absolute top-50 start-50 translate-middle fs-5"></i>
        </button>
      </div>
      <button class="btn btn-link p-0 text-decoration-underline text-dark fw-bold small mt-3">+ Show More</button>
    </FilterSection>

    <hr class="text-muted">

    <FilterSection title="Case Features" icon="-">
      <div class="form-check mb-2" v-for="feature in filterData.caseFeatures" :key="feature.value">
        <input class="form-check-input" type="checkbox" :id="feature.value" :value="feature.value" v-model="selectedCaseFeatures">
        <label class="form-check-label text-dark" :for="feature.value">
          {{ feature.label }} <span class="text-muted small">({{ countProductsByCaseFeature(feature.value) }})</span>
        </label>
      </div>
    </FilterSection>
    
    <hr class="text-muted">

    <FilterSection title="Screen Protector Features" icon="-">
      <div class="form-check mb-2" v-for="feature in filterData.screenFeatures" :key="feature.value">
        <input class="form-check-input" type="checkbox" :id="feature.value" :value="feature.value" v-model="selectedScreenFeatures">
        <label class="form-check-label text-dark" :for="feature.value">
          {{ feature.label }} <span class="text-muted small">({{ countProductsByScreenFeature(feature.value) }})</span>
        </label>
      </div>
    </FilterSection>

  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { productsDB, filterData } from './data/db';

// Khai báo sự kiện gửi data cho file cha
const emit = defineEmits(['filter-changed']);

// Các mảng lưu lựa chọn của người dùng
const selectedTypes = ref<string[]>([]);
const selectedModels = ref<string[]>(['ip17promax']); // Luôn chọn mặc định giống mẫu
const selectedColors = ref<string[]>([]);
const selectedCaseFeatures = ref<string[]>([]);
const selectedScreenFeatures = ref<string[]>([]);

// Theo dõi bất kỳ thay đổi nào và gửi dữ liệu lên file cha
watch([selectedTypes, selectedColors, selectedCaseFeatures, selectedScreenFeatures], () => {
  emit('filter-changed', {
    types: selectedTypes.value,
    colors: selectedColors.value,
    caseFeatures: selectedCaseFeatures.value,
    screenFeatures: selectedScreenFeatures.value
  });
});

// Hàm logic phụ (Dùng cho sidebar tự động đếm số sản phẩm)
const countProductsByType = (typeValue: string) => productsDB.filter(p => p.type === typeValue).length;
const countProductsByCaseFeature = (featureValue: string) => productsDB.filter(p => p.type.startsWith('case') && p.features.includes(featureValue)).length;
const countProductsByScreenFeature = (featureValue: string) => productsDB.filter(p => p.type.startsWith('screen') && p.features.includes(featureValue)).length;

// Logic cho bộ chọn màu sắc
const toggleColorFilter = (colorValue: string) => {
  const index = selectedColors.value.indexOf(colorValue);
  if (index > -1) {
    selectedColors.value.splice(index, 1);
  } else {
    selectedColors.value.push(colorValue);
  }
};
</script>

<style scoped>
.form-check-input:checked { background-color: #000; border-color: #000; }
.form-check-label { cursor: pointer; }
.color-dot { width: 35px; height: 35px; border: none; padding: 0; }
.color-dot.active-border { border-color: #000 !important; }
</style>