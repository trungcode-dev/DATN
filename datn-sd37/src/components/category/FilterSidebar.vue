<template>
  <div class="filter-sidebar pe-lg-5" style="font-family: 'Inter', sans-serif;">
    <div class="filter-group mb-4 pb-3 border-bottom border-light-subtle" v-if="types.length > 0">
      <h6 class="fw-bold d-flex justify-content-between align-items-center mb-3 text-dark cursor-pointer" @click="isTypeExpanded = !isTypeExpanded">
        Loại Sản Phẩm <span class="toggle-icon" :class="{ 'expanded': isTypeExpanded }"></span>
      </h6>
      <div v-show="isTypeExpanded">
        <div class="form-check custom-checkbox mb-2" v-for="typeItem in types" :key="typeItem.name">
          <input class="form-check-input" type="checkbox" :id="'type-'+typeItem.name" :value="typeItem.name" v-model="localSelectedTypes">
          <label class="form-check-label text-secondary" :for="'type-'+typeItem.name">
            {{ typeItem.name }} <span class="text-muted">({{ typeItem.count }})</span>
          </label>
        </div>
      </div>
    </div>

    <div class="filter-group mb-4 pb-3 border-bottom border-light-subtle" v-if="models.length > 0">
      <h6 class="fw-bold d-flex justify-content-between align-items-center mb-3 text-dark cursor-pointer" @click="isModelExpanded = !isModelExpanded">
        Dòng Máy <span class="toggle-icon" :class="{ 'expanded': isModelExpanded }"></span>
      </h6>
      <div v-show="isModelExpanded">
        <div class="form-check custom-checkbox mb-2" v-for="model in visibleModels" :key="model.name">
          <input class="form-check-input" type="checkbox" :id="'model-'+model.name" :value="model.name" v-model="localSelectedModels">
          <label class="form-check-label text-secondary d-flex justify-content-between w-100 pe-4" :for="'model-'+model.name">
            <span class="text-truncate">{{ model.name }}</span><span class="text-muted ms-2">({{ model.count }})</span>
          </label>
        </div>
        <a href="#" v-if="models.length > 10" @click.prevent="showAllModels = !showAllModels" class="text-dark fw-bold small text-decoration-underline mt-2 d-inline-block">
          {{ showAllModels ? '- Thu Gọn' : '+ Xem Thêm' }}
        </a>
      </div>
    </div>

    <div class="filter-group mb-4" v-if="features.length > 0">
      <h6 class="fw-bold d-flex justify-content-between align-items-center mb-3 text-dark cursor-pointer" @click="isFeaturesExpanded = !isFeaturesExpanded">
        Tính Năng <span class="toggle-icon" :class="{ 'expanded': isFeaturesExpanded }"></span>
      </h6>
      <div v-show="isFeaturesExpanded">
        <div class="form-check custom-checkbox mb-2" v-for="feature in features" :key="feature.name">
          <input class="form-check-input" type="checkbox" :id="'feat-'+feature.name" :value="feature.name" v-model="localSelectedFeatures">
          <label class="form-check-label text-secondary d-flex justify-content-between w-100 pe-4" :for="'feat-'+feature.name">
            <span class="text-truncate">{{ feature.name }}</span><span class="text-muted ms-2">({{ feature.count }})</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

type FilterItem = { name: string; count: number }

const props = defineProps<{
  types: FilterItem[], 
  models: FilterItem[], 
  features: FilterItem[],
  selectedTypes: string[], 
  selectedModels: string[], 
  selectedFeatures: string[]
}>()

const emit = defineEmits(['update:selectedTypes', 'update:selectedModels', 'update:selectedFeatures'])

const isTypeExpanded = ref(true)
const isModelExpanded = ref(true)
const isFeaturesExpanded = ref(true)
const showAllModels = ref(false)

const visibleModels = computed(() => showAllModels.value ? props.models : props.models.slice(0, 10))

const localSelectedTypes = computed({ get: () => props.selectedTypes, set: (v) => emit('update:selectedTypes', v) })
const localSelectedModels = computed({ get: () => props.selectedModels, set: (v) => emit('update:selectedModels', v) })
const localSelectedFeatures = computed({ get: () => props.selectedFeatures, set: (v) => emit('update:selectedFeatures', v) })
</script>

<style scoped>
.custom-checkbox .form-check-input { border-radius: 2px; border-color: #d2d2d7; width: 1.1em; height: 1.1em; cursor: pointer; margin-top: 0.2em; }
.custom-checkbox .form-check-input:checked { background-color: #212529; border-color: #212529; }
.custom-checkbox label { cursor: pointer; font-size: 0.9rem; }
.toggle-icon { width: 14px; height: 14px; position: relative; display: inline-block; transition: transform 0.4s ease; }
.toggle-icon::before, .toggle-icon::after { content: ""; position: absolute; background-color: #212529; transition: transform 0.4s ease; }
.toggle-icon::before { top: 6px; left: 0; width: 14px; height: 2px; }
.toggle-icon::after { top: 0; left: 6px; width: 2px; height: 14px; }
.toggle-icon.expanded { transform: rotate(180deg); }
.toggle-icon.expanded::after { transform: rotate(90deg); }
</style>