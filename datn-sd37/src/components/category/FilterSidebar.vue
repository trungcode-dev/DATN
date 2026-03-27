<template>
  <div class="filter-sidebar pe-lg-4" style="font-family: 'Inter', sans-serif;">
    
    <div class="filter-group mb-4 pb-4 border-bottom">
      <div class="d-flex justify-content-between align-items-center mb-3 cursor-pointer" @click="toggle('type')">
        <h5 class="fw-bold mb-0 text-dark fs-5">Type</h5>
        <i class="bi text-dark" :class="open.type ? 'bi-dash-lg' : 'bi-plus-lg'"></i>
      </div>
      <div v-show="open.type" class="filter-options">
        <div class="form-check mb-2" v-for="item in filterData.types" :key="item.name">
          <input class="form-check-input shadow-none rounded-1" type="checkbox" :id="'type-'+item.name" :value="item.name" v-model="selectedTypes">
          <label class="form-check-label text-dark" :for="'type-'+item.name">
            {{ item.name }} <span class="text-secondary small">({{ item.count }})</span>
          </label>
        </div>
      </div>
    </div>

    <div class="filter-group mb-4 pb-4 border-bottom">
      <div class="d-flex justify-content-between align-items-center mb-3 cursor-pointer" @click="toggle('model')">
        <h5 class="fw-bold mb-0 text-dark fs-5">Phone Model</h5>
        <i class="bi text-dark" :class="open.model ? 'bi-dash-lg' : 'bi-plus-lg'"></i>
      </div>
      <div v-show="open.model" class="filter-options">
        <div class="form-check mb-2" v-for="item in filterData.models" :key="item.name">
          <input class="form-check-input shadow-none rounded-1" type="checkbox" :id="'model-'+item.name" :value="item.name" v-model="selectedModels">
          <label class="form-check-label text-dark" :for="'model-'+item.name">
            {{ item.name }} <span class="text-secondary small">({{ item.count }})</span>
          </label>
        </div>
      </div>
    </div>

    <div class="filter-group mb-4 pb-4 border-bottom">
      <div class="d-flex justify-content-between align-items-center mb-3 cursor-pointer" @click="toggle('color')">
        <h5 class="fw-bold mb-0 text-dark fs-5">Color</h5>
        <i class="bi text-dark" :class="open.color ? 'bi-dash-lg' : 'bi-plus-lg'"></i>
      </div>
      <div v-show="open.color" class="d-flex flex-wrap gap-2">
        <div v-for="color in filterData.colors" :key="color.hex"
             class="color-swatch rounded-circle cursor-pointer border"
             :style="{ background: color.hex }"
             :class="{ 'border-dark border-2 scale-up': selectedColors.includes(color.hex) }"
             @click="toggleColor(color.hex)">
        </div>
        <div class="w-100 mt-2">
          <span class="text-decoration-underline small cursor-pointer text-dark fw-medium">+ Show More</span>
        </div>
      </div>
    </div>

    <div class="filter-group mb-4 pb-4 border-bottom">
      <div class="d-flex justify-content-between align-items-center mb-3 cursor-pointer" @click="toggle('caseFeature')">
        <h5 class="fw-bold mb-0 text-dark fs-5">Case Features</h5>
        <i class="bi text-dark" :class="open.caseFeature ? 'bi-dash-lg' : 'bi-plus-lg'"></i>
      </div>
      <div v-show="open.caseFeature" class="filter-options">
        <div class="form-check mb-2" v-for="item in filterData.caseFeatures" :key="item.name">
          <input class="form-check-input shadow-none rounded-1" type="checkbox" :id="'cf-'+item.name" :value="item.name" v-model="selectedFeatures">
          <label class="form-check-label text-dark" :for="'cf-'+item.name">
            {{ item.name }} <span class="text-secondary small">({{ item.count }})</span>
          </label>
        </div>
      </div>
    </div>

    <div class="filter-group mb-4 pb-4">
      <div class="d-flex justify-content-between align-items-center mb-3 cursor-pointer" @click="toggle('screenFeature')">
        <h5 class="fw-bold mb-0 text-dark fs-5">Screen Protector Features</h5>
        <i class="bi text-dark" :class="open.screenFeature ? 'bi-dash-lg' : 'bi-plus-lg'"></i>
      </div>
      <div v-show="open.screenFeature" class="filter-options">
        <div class="form-check mb-2" v-for="item in filterData.screenFeatures" :key="item.name">
          <input class="form-check-input shadow-none rounded-1" type="checkbox" :id="'sf-'+item.name" :value="item.name" v-model="selectedFeatures">
          <label class="form-check-label text-dark" :for="'sf-'+item.name">
            {{ item.name }} <span class="text-secondary small">({{ item.count }})</span>
          </label>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// Kết nối với CategoryView để lọc thật
const selectedTypes = defineModel<string[]>('selectedTypes', { default: () => [] })
const selectedModels = defineModel<string[]>('selectedModels', { default: () => [] })
const selectedFeatures = defineModel<string[]>('selectedFeatures', { default: () => [] })
const selectedColors = ref<string[]>([])

// Trạng thái Đóng/Mở của các thẻ
const open = reactive({
  type: true,
  model: true,
  color: true,
  caseFeature: true,
  screenFeature: true
})

const toggle = (section: keyof typeof open) => {
  open[section] = !open[section]
}

const toggleColor = (hex: string) => {
  const index = selectedColors.value.indexOf(hex)
  if (index > -1) selectedColors.value.splice(index, 1)
  else selectedColors.value.push(hex)
}

// Dữ liệu giả lập chuẩn xác 100% theo ảnh bạn gửi
const filterData = {
  types: [
    { name: 'Super Thin Case', count: 1 },
    { name: 'Magnetic Case', count: 1 },
    { name: 'Flex Case', count: 1 },
    { name: 'Glass Screen Protector', count: 1 },
    { name: 'Privacy Glass Screen Protector', count: 1 },
    { name: 'Active Case', count: 1 },
    { name: 'RePeel Case', count: 1 }
  ],
  models: [
    { name: 'iPhone 17 Pro Max', count: 7 }
  ],
  colors: [
    { hex: '#333333' }, { hex: '#000000' }, { hex: '#e2dcca' }, { hex: '#ffffff' }, 
    { hex: '#e88c4a' }, { hex: '#424b5a' }, { hex: '#4f4756' }, { hex: '#f4f4f4' }, 
    { hex: 'linear-gradient(135deg, #555, #000)' }, { hex: '#fdfdfd' }, { hex: '#1a1f24' }, 
    { hex: '#1d5939' }, { hex: '#b5ab9d' }, { hex: '#183f6b' }
  ],
  caseFeatures: [
    { name: 'Drop-Tested', count: 2 },
    { name: 'Easy Grip', count: 1 },
    { name: 'Magsafe-Compatible', count: 1 },
    { name: 'Pocket friendly', count: 4 },
    { name: 'Shockproof', count: 1 },
    { name: 'Snug fit', count: 4 },
    { name: 'Thin Design', count: 1 }
  ],
  screenFeatures: [
    { name: '9H Hardness Rating', count: 1 },
    { name: '28° Privacy Filtering', count: 1 },
    { name: 'Reinforced Silicone Edges', count: 1 },
    { name: '3D Design', count: 1 },
    { name: 'HD Clarity', count: 1 },
    { name: 'Oleophobic Coating', count: 1 },
    { name: 'Anti-Fingerprint', count: 1 }
  ]
}
</script>

<style scoped>
.cursor-pointer { cursor: pointer; }

/* Tùy chỉnh ô Checkbox vuông vắn, viền nhạt giống Peel */
.form-check-input {
  width: 1.1em;
  height: 1.1em;
  margin-top: 0.25em;
  border-color: #adb5bd;
}
.form-check-input:checked {
  background-color: #000;
  border-color: #000;
}

/* Tùy chỉnh các chấm màu (Color Swatches) */
.color-swatch {
  width: 32px;
  height: 32px;
  border-color: #dee2e6 !important;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.color-swatch:hover {
  transform: scale(1.1);
}
.color-swatch.scale-up {
  transform: scale(1.15);
  box-shadow: 0 0 0 2px #fff, 0 0 0 4px #000;
}
</style>