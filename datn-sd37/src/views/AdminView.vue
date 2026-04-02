<template>
  <div class="modern-layout d-flex flex-column" style="font-family: 'Inter', system-ui, sans-serif; background-color: #f8fafc; min-height: 100vh;">

    <header class="top-nav-glass sticky-top d-flex align-items-center justify-content-between px-4 z-3">
      
      <div class="d-flex align-items-center gap-2">
        <div class="bg-indigo text-white rounded-3 d-flex align-items-center justify-content-center shadow-indigo" style="width: 36px; height: 36px;">
          <i class="bi bi-layers-fill fs-5"></i>
        </div>
        <h4 class="fw-black mb-0 text-slate-800 tracking-tight" style="letter-spacing: 0.5px;">LATRA<span class="text-indigo"></span></h4>
      </div>

      <div class="d-flex align-items-center gap-1 bg-slate-100 p-1 rounded-pill border border-slate-200 shadow-sm">
        <button @click="switchTab('pos')" class="btn nav-pill transition-all fw-semibold" :class="activeTab === 'pos' ? 'active shadow-sm' : 'text-slate-500 hover-text-dark'">
          <i class="bi bi-cart3 me-1"></i> Bán hàng
        </button>
        <button @click="switchTab('dashboard')" class="btn nav-pill transition-all fw-semibold" :class="activeTab === 'dashboard' ? 'active shadow-sm' : 'text-slate-500 hover-text-dark'">
          <i class="bi bi-grid-1x2 me-1"></i> Tổng quan
        </button>
        <button v-for="item in menuItems" :key="item.id" @click="switchTab(item.id)" class="btn nav-pill transition-all fw-semibold" :class="activeTab === item.id ? 'active shadow-sm' : 'text-slate-500 hover-text-dark'">
          <i :class="item.icon" class="me-1"></i> {{ item.name }}
        </button>
      </div>

      <div class="d-flex align-items-center gap-3">
        <div class="text-slate-500 fw-medium small d-flex align-items-center gap-2 bg-white px-3 py-2 rounded-pill shadow-sm border border-slate-100">
          <i class="bi bi-clock text-indigo"></i> {{ currentTime }}
        </div>
        <button class="btn btn-white rounded-circle shadow-sm border border-slate-100 d-flex align-items-center justify-content-center hover-lift position-relative" style="width: 40px; height: 40px;">
          <i class="bi bi-bell text-slate-700 fs-5"></i>
          <span class="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-white rounded-circle"></span>
        </button>
        <div class="bg-indigo text-white rounded-circle fw-bold d-flex align-items-center justify-content-center shadow-indigo cursor-pointer hover-lift" style="width: 40px; height: 40px; font-size: 0.85rem;">
          AD
        </div>
      </div>
    </header>

    <main class="flex-grow-1 d-flex flex-column position-relative container-fluid px-4 pb-4 pt-4">
      <transition name="fade-slide" mode="out-in">

        <div v-if="activeTab === 'pos'" class="h-100 row g-4" key="pos">
          
          <div class="col-xl-8 col-lg-7 d-flex flex-column h-100">
            
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h4 class="fw-bolder text-slate-800 mb-1">Điểm bán hàng</h4>
                <div class="text-slate-500 small">Chọn sản phẩm để thêm vào giỏ hàng</div>
              </div>
              
              <div class="position-relative" style="width: 320px;">
                <i class="bi bi-search position-absolute top-50 translate-middle-y text-slate-400 ms-3"></i>
                <input v-model="posSearch" type="text" class="form-control form-control-lg bg-white border-0 shadow-sm rounded-pill ps-5 fs-6 fw-medium text-slate-700 focus-ring-indigo" placeholder="Tìm sản phẩm, SKU...">
              </div>
            </div>

            <div class="flex-grow-1 overflow-auto custom-scrollbar pe-2 pb-2">
              <div v-if="posFilteredProducts.length === 0" class="h-100 d-flex flex-column justify-content-center align-items-center text-slate-400">
                <i class="bi bi-box-seam fs-1 mb-3 opacity-50"></i>
                <span class="fw-medium">Không tìm thấy sản phẩm nào</span>
              </div>

              <div class="row g-3">
                <div v-for="item in posFilteredProducts" :key="item.id" class="col-xl-4 col-md-6">
                  <div class="card product-card border-0 shadow-sm rounded-4 h-100 d-flex flex-column p-3 cursor-pointer transition-all hover-lift" @click="addToCart(item)">
                    <div class="d-flex justify-content-between align-items-start mb-3">
                      <div class="bg-slate-50 text-indigo rounded-3 d-flex align-items-center justify-content-center border border-slate-100" style="width: 48px; height: 48px;">
                        <i class="bi bi-phone fs-4"></i>
                      </div>
                      <span class="badge rounded-pill fw-medium" :class="getAvailableStock(item) > 5 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-danger'">
                        Tồn: {{ getAvailableStock(item) }}
                      </span>
                    </div>
                    
                    <h6 class="fw-bold text-slate-800 mb-1 text-truncate" :title="item.name">{{ item.name }}</h6>
                    <div class="text-slate-500 small fw-medium mb-3">
                      {{ item.itemType }} <span class="mx-1 opacity-50">•</span> {{ item.color }}
                    </div>
                    
                    <div class="mt-auto d-flex justify-content-between align-items-center pt-3 border-top border-slate-100">
                      <div class="fw-black text-slate-800 fs-5">{{ formatMoney(item.price) }}</div>
                      <button class="btn btn-indigo-light btn-sm rounded-circle d-flex align-items-center justify-content-center transition-all" style="width: 32px; height: 32px;" :disabled="getAvailableStock(item) <= 0">
                        <i class="bi bi-plus-lg fw-bolder"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-4 col-lg-5 h-100 d-flex flex-column">
            <div class="bg-white rounded-4 shadow-sm d-flex flex-column h-100 overflow-hidden border border-slate-100">
              
              <div class="p-4 border-bottom border-slate-100 bg-white d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center gap-2">
                  <i class="bi bi-basket-fill text-indigo fs-5"></i>
                  <h6 class="fw-bolder text-slate-800 mb-0">HÓA ĐƠN MỚI</h6>
                </div>
                <span class="badge bg-slate-100 text-slate-600 rounded-pill px-3 py-2 fw-semibold border border-slate-200">
                  Khách Online
                </span>
              </div>

              <div class="flex-grow-1 overflow-auto custom-scrollbar p-3 bg-slate-50">
                <div v-if="cart.length === 0" class="h-100 d-flex flex-column justify-content-center align-items-center text-slate-400">
                  <div class="bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm mb-3" style="width: 64px; height: 64px;">
                    <i class="bi bi-cart3 fs-2 text-slate-300"></i>
                  </div>
                  <span class="fw-medium small">Giỏ hàng đang trống</span>
                </div>

                <transition-group name="list">
                  <div v-for="(item, index) in cart" :key="item.id" class="bg-white p-3 rounded-4 shadow-sm mb-3 border border-slate-100 position-relative transition-all cart-item-card">
                    <button class="btn btn-sm btn-white text-danger rounded-circle position-absolute shadow-sm btn-remove-item d-flex align-items-center justify-content-center hover-shake" @click.stop="removeFromCart(index)">
                      <i class="bi bi-x-lg"></i>
                    </button>

                    <div class="pe-3">
                      <div class="fw-bold text-slate-800 mb-1" style="font-size: 0.95rem;">{{ item.name }}</div>
                      <div class="text-slate-500 fw-medium" style="font-size: 0.75rem;">{{ item.color }} • {{ formatMoney(item.price) }}</div>
                    </div>
                    
                    <div class="d-flex justify-content-between align-items-center mt-3">
                      <div class="d-flex align-items-center bg-slate-50 rounded-pill p-1 border border-slate-200">
                        <button class="btn btn-sm text-slate-600 rounded-circle fw-bold border-0 hover-bg-white shadow-none" style="width: 26px; height: 26px; padding:0;" @click.stop="decreaseQty(index)">-</button>
                        <span class="fw-bold px-2 text-slate-800" style="font-size: 0.85rem; min-width: 24px; text-align: center;">{{ item.qty }}</span>
                        <button class="btn btn-sm text-slate-600 rounded-circle fw-bold border-0 hover-bg-white shadow-none" style="width: 26px; height: 26px; padding:0;" @click.stop="increaseQty(index)">+</button>
                      </div>

                      <div class="text-end">
                        <div class="mb-1">
                          <select v-model="item.voucherId" class="form-select form-select-sm border-0 bg-transparent shadow-none fw-semibold text-end pe-3 py-0 cursor-pointer" 
                                  :class="item.voucherId ? 'text-indigo' : 'text-slate-400'" style="font-size: 0.75rem;">
                            <option value="">Thêm voucher</option>
                            <option v-for="v in getValidVouchersForItem(item, index)" :key="v.id" :value="v.id" class="text-slate-700">
                              {{ v.id }} (-{{ v.discount }}%)
                            </option>
                          </select>
                        </div>
                        <div class="fw-black text-danger fs-5 lh-1">{{ formatMoney(calculateItemTotal(item)) }}</div>
                      </div>
                    </div>
                  </div>
                </transition-group>
              </div>

              <div class="p-4 bg-white border-top border-slate-100 z-1">
                <div class="d-flex justify-content-between mb-2 text-slate-500 fw-medium small">
                  <span>Tổng tiền hàng ({{ cart.reduce((s, i) => s + i.qty, 0) }}):</span>
                  <span class="text-slate-700">{{ formatMoney(cartRawTotal) }}</span>
                </div>
                <div class="d-flex justify-content-between mb-3 text-indigo fw-semibold small">
                  <span>Voucher giảm giá:</span>
                  <span>- {{ formatMoney(cartTotalDiscount) }}</span>
                </div>
                
                <div class="d-flex justify-content-between align-items-center mt-3 pt-3 border-top border-slate-100">
                  <span class="fw-bold text-slate-500 text-uppercase tracking-wider" style="font-size: 0.8rem;">THANH TOÁN</span>
                  <span class="fw-black fs-2 text-slate-800 tracking-tight lh-1">{{ formatMoney(cartFinalTotal) }}</span>
                </div>

                <button class="btn btn-indigo w-100 mt-4 py-3 fw-bold fs-6 rounded-4 shadow-indigo hover-lift transition-all d-flex justify-content-center align-items-center gap-2" @click="handleCheckout">
                  <i class="bi bi-credit-card-fill"></i> TẠO ĐƠN HÀNG
                </button>
              </div>
            </div>
          </div>

        </div>

        <div v-else-if="activeTab === 'dashboard'" key="dashboard" class="h-100 overflow-y-auto custom-scrollbar pb-4">
          <div class="row g-4 mb-4">
            <div class="col-md-3" v-for="(stat, idx) in dashboardStats" :key="idx">
              <div class="bg-white p-4 rounded-4 shadow-sm border border-slate-100 h-100 d-flex flex-row align-items-center gap-4 hover-lift transition-all cursor-pointer">
                <div class="rounded-circle d-flex align-items-center justify-content-center bg-indigo-50 text-indigo" style="width: 56px; height: 56px;">
                  <i :class="stat.icon" class="fs-4"></i>
                </div>
                <div>
                  <div class="text-slate-400 fw-semibold small mb-1">{{ stat.title }}</div>
                  <h3 class="fw-black text-slate-800 mb-0 tracking-tight">{{ stat.value }}</h3>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-4 shadow-sm border border-slate-100 p-5 text-center text-slate-400 d-flex flex-column align-items-center justify-content-center" style="min-height: 400px;">
            <div class="bg-slate-50 rounded-circle d-flex align-items-center justify-content-center mb-3" style="width: 80px; height: 80px;">
              <i class="bi bi-bar-chart-line fs-1 text-slate-300"></i>
            </div>
            <h6 class="fw-semibold">Biểu đồ đang được tổng hợp...</h6>
          </div>
        </div>

        <div v-else :key="activeTab" class="bg-white h-100 d-flex flex-column overflow-hidden rounded-4 shadow-sm border border-slate-100">
          <div class="p-4 border-bottom border-slate-100 d-flex justify-content-between align-items-center z-2">
            <h5 class="fw-bolder text-slate-800 mb-0 tracking-tight text-capitalize">{{ pageTitle }}</h5>
            
            <div class="d-flex gap-3">
              <div class="position-relative" style="width: 300px;">
                <i class="bi bi-search position-absolute top-50 translate-middle-y text-slate-400 ms-3"></i>
                <input v-model="searchQuery" type="text" class="form-control bg-slate-50 border border-slate-200 text-slate-700 ps-5 py-2 shadow-none rounded-pill fw-medium focus-ring-indigo" placeholder="Tìm kiếm...">
              </div>
              <button @click="openModal('add')" class="btn btn-indigo fw-semibold px-4 py-2 rounded-pill shadow-indigo hover-lift d-flex align-items-center gap-2">
                <i class="bi bi-plus-lg"></i> Thêm mới
              </button>
            </div>
          </div>
          
          <div class="p-0 flex-grow-1 overflow-auto custom-scrollbar">
            <table class="table align-middle mb-0 modern-table">
              <thead class="bg-white text-slate-400 small fw-bold tracking-wider text-uppercase" style="position: sticky; top: 0; z-index: 1;">
                <tr>
                  <th class="ps-4 py-3 border-bottom border-slate-200" v-for="col in currentSchema" :key="col.key">{{ col.label }}</th>
                  <th class="text-end pe-4 py-3 border-bottom border-slate-200">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="filteredData.length === 0">
                  <td :colspan="currentSchema.length + 1" class="text-center py-5 text-slate-400 fw-medium">
                    Không có dữ liệu hiển thị.
                  </td>
                </tr>
                <tr v-for="row in filteredData" :key="row.id" class="transition-all hover-bg-slate">
                  <td class="ps-4 py-3 border-bottom border-slate-50" v-for="col in currentSchema" :key="col.key">
                    <span v-if="col.type === 'status'" class="badge fw-medium px-3 py-2 rounded-pill" :class="row[col.key] === 'Hoạt động' || row[col.key] === 'Hoàn thành' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'">{{ row[col.key] }}</span>
                    <span v-else-if="col.type === 'money'" class="fw-bold text-slate-800">{{ formatMoney(row[col.key]) }}</span>
                    <span v-else-if="col.type === 'percent'" class="fw-bold text-indigo">{{ row[col.key] }}%</span>
                    <span v-else-if="col.type === 'datetime'" class="text-slate-500 small fw-medium">{{ formatVNTime(row[col.key]) }}</span>
                    <span v-else-if="col.key === 'id'" class="text-slate-400 fw-semibold small">#{{ row[col.key] }}</span>
                    <span v-else class="text-slate-700 fw-medium">{{ row[col.key] }}</span>
                  </td>
                  <td class="text-end pe-4 py-3 border-bottom border-slate-50">
                    <button @click="openModal('edit', row)" class="btn btn-sm btn-white text-indigo border border-slate-200 shadow-sm rounded-circle me-2 btn-action"><i class="bi bi-pencil-fill"></i></button>
                    <button @click="deleteItem(row.id)" class="btn btn-sm btn-white text-danger border border-slate-200 shadow-sm rounded-circle btn-action"><i class="bi bi-trash3-fill"></i></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </transition>
    </main>

    <Teleport to="body">
      <transition name="fade-scale">
        <div v-if="showModal" class="modal-overlay d-flex align-items-center justify-content-center" @click.self="closeModal">
          <div class="bg-white rounded-4 shadow-lg modal-content-custom d-flex flex-column overflow-hidden">
            <div class="p-4 border-bottom border-slate-100 d-flex justify-content-between align-items-center bg-slate-50">
              <h5 class="mb-0 fw-bolder text-slate-800">{{ modalMode === 'add' ? 'Thêm Dữ Liệu' : 'Cập Nhật' }}</h5>
              <button @click="closeModal" class="btn-close shadow-none"></button>
            </div>
            <div class="p-4 custom-scrollbar overflow-y-auto">
              <form @submit.prevent="saveData">
                <div class="mb-3" v-for="col in currentSchema" :key="col.key">
                  <label class="form-label small fw-semibold text-slate-500 mb-1">{{ col.label }}</label>
                  <select v-if="col.options" v-model="formData[col.key]" class="form-select shadow-none border-slate-200 bg-white fw-medium text-slate-800 rounded-3 focus-ring-indigo" required>
                    <option v-for="opt in col.options" :key="opt" :value="opt">{{ opt }}</option>
                  </select>
                  <input v-else-if="col.type === 'money' || col.type === 'number' || col.type === 'percent'" v-model.number="formData[col.key]" type="number" class="form-control shadow-none border-slate-200 bg-white fw-bold text-slate-800 rounded-3 focus-ring-indigo" required>
                  <input v-else-if="col.type === 'datetime'" v-model="formData[col.key]" type="datetime-local" class="form-control shadow-none border-slate-200 bg-white fw-medium text-slate-800 rounded-3 focus-ring-indigo" required>
                  <input v-else v-model="formData[col.key]" type="text" class="form-control shadow-none border-slate-200 bg-white fw-medium text-slate-800 rounded-3 focus-ring-indigo" required :disabled="col.key === 'id' && modalMode === 'edit'">
                </div>
                <div class="d-flex justify-content-end gap-2 pt-3 mt-4 border-top border-slate-100">
                  <button type="button" @click="closeModal" class="btn btn-white border border-slate-200 px-4 py-2 rounded-pill fw-semibold text-slate-600 hover-bg-slate">Hủy</button>
                  <button type="submit" class="btn btn-indigo px-4 py-2 rounded-pill fw-bold shadow-indigo hover-lift">Lưu Thông Tin</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, onUnmounted } from 'vue'

const activeTab = ref('pos') 
const searchQuery = ref('')
const currentTime = ref('')

onMounted(() => {
  const updateClock = () => {
    const now = new Date()
    const p = (n: number) => n.toString().padStart(2, '0')
    currentTime.value = `${p(now.getHours())}:${p(now.getMinutes())}:${p(now.getSeconds())} - ${p(now.getDate())}/${p(now.getMonth()+1)}/${now.getFullYear()}`
  }
  updateClock()
  const timer = setInterval(updateClock, 1000)
  onUnmounted(() => clearInterval(timer))
})

interface Database {
  products: any[]; promotions: any[]; orders: any[]; customers: any[]; employees: any[]; settings: any[];
  [key: string]: any[];
}

const db = reactive<Database>({
  products: [
    { id: 'SP001', name: 'iPhone 17 Pro Max', itemType: 'Điện thoại', color: 'Đen Titan', feature: '256GB', stock: 15, price: 34990000, status: 'Hoạt động' },
    { id: 'SP002', name: 'Ốp lưng Magsafe Ultra', itemType: 'Phụ kiện', color: 'Trong suốt', feature: 'Chống ố', stock: 99, price: 289000, status: 'Hoạt động' },
    { id: 'SP003', name: 'Củ sạc 20W Fast Charge', itemType: 'Phụ kiện', color: 'Trắng', feature: 'Sạc nhanh', stock: 200, price: 450000, status: 'Hoạt động' },
    { id: 'SP004', name: 'Kính cường lực KingKong', itemType: 'Phụ kiện', color: 'Trong suốt', feature: 'Chống nhìn trộm', stock: 100, price: 150000, status: 'Hoạt động' },
    { id: 'SP005', name: 'Galaxy S24 Ultra AI', itemType: 'Điện thoại', color: 'Xám Titan', feature: '512GB', stock: 8, price: 31990000, status: 'Hoạt động' }
  ],
  promotions: [
    { id: 'GIAM10', name: 'Sale Toàn sàn', discount: 10, maxAmount: 500000, applyTo: 'Tất cả đơn hàng', usageLimit: 50, status: 'Hoạt động' },
    { id: 'PHUKIEN50', name: 'Xả Phụ Kiện', discount: 50, maxAmount: 200000, applyTo: 'Chỉ Phụ kiện', usageLimit: 10, status: 'Hoạt động' },
    { id: 'DTVIP', name: 'Trợ giá ĐT', discount: 5, maxAmount: 2000000, applyTo: 'Chỉ Điện thoại', usageLimit: 5, status: 'Hoạt động' }
  ],
  orders: [], 
  customers: [
    { id: 'CUS01', name: 'Nguyễn Văn Khách', phone: '0901234567', totalSpent: 12000000, status: 'Hoạt động' }
  ], 
  employees: [
    { id: 'NV01', name: 'Nguyễn Trung Hiếu', role: 'Admin', status: 'Hoạt động' }
  ], 
  settings: [
    { id: 'CFG01', name: 'Phí ship mặc định', value: '30000', status: 'Hoạt động' }
  ]
})

const posSearch = ref('')
const cart = ref<any[]>([]) 

const getAvailableStock = (product: any) => {
  const cartItem = cart.value.find(i => i.id === product.id)
  return product.stock - (cartItem ? cartItem.qty : 0)
}

const posFilteredProducts = computed(() => {
  const data = db.products || []
  if(!posSearch.value) return data
  const q = posSearch.value.toLowerCase()
  return data.filter(p => p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.itemType.toLowerCase().includes(q))
})

const addToCart = (product: any) => {
  if (getAvailableStock(product) <= 0) return alert('Sản phẩm đã hết hàng!')
  const existing = cart.value.find(item => item.id === product.id)
  if(existing) existing.qty++
  else cart.value.push({ ...product, qty: 1, voucherId: '' })
}

const increaseQty = (index: number) => {
  const item = cart.value[index]
  const p = db.products.find(prod => prod.id === item.id)
  if (p && getAvailableStock(p) > 0) item.qty++
}
const decreaseQty = (index: number) => {
  if(cart.value[index].qty > 1) cart.value[index].qty--
  else cart.value.splice(index, 1)
}
const removeFromCart = (index: number) => cart.value.splice(index, 1)

const getValidVouchersForItem = (item: any, currentIndex: number) => {
  return db.promotions.filter(v => {
    if (v.status !== 'Hoạt động' || v.usageLimit <= 0) return false
    if (v.applyTo === 'Chỉ Điện thoại' && item.itemType !== 'Điện thoại') return false
    if (v.applyTo === 'Chỉ Phụ kiện' && item.itemType !== 'Phụ kiện') return false
    const isUsedByOthers = cart.value.some((cItem, cIdx) => cIdx !== currentIndex && cItem.voucherId === v.id)
    if (isUsedByOthers) return false
    return true
  })
}

const calculateItemTotal = (item: any) => {
  const rawTotal = item.price * item.qty
  if (!item.voucherId) return rawTotal
  const v = db.promotions.find(p => p.id === item.voucherId)
  if (!v) return rawTotal
  let discount = (rawTotal * v.discount) / 100
  discount = Math.min(discount, v.maxAmount)
  return rawTotal - discount
}

const cartRawTotal = computed(() => cart.value.reduce((sum, item) => sum + (item.price * item.qty), 0))
const cartFinalTotal = computed(() => cart.value.reduce((sum, item) => sum + calculateItemTotal(item), 0))
const cartTotalDiscount = computed(() => cartRawTotal.value - cartFinalTotal.value)

const handleCheckout = () => {
  if(cart.value.length === 0) return alert('Vui lòng thêm sản phẩm vào hóa đơn!')
  
  if (confirm(`Xác nhận thanh toán đơn hàng: ${formatMoney(cartFinalTotal.value)} ?`)) {
    cart.value.forEach(cartItem => {
      const p = db.products.find(prod => prod.id === cartItem.id)
      if (p) p.stock -= cartItem.qty
      if (cartItem.voucherId) {
        const v = db.promotions.find(promo => promo.id === cartItem.voucherId)
        if (v) v.usageLimit -= 1
      }
    })

    db.orders.push({
      id: 'ORD' + Date.now().toString().slice(-4),
      createdAt: new Date().toISOString(),
      customer: 'Khách Lẻ Mua Hàng',
      total: cartFinalTotal.value,
      status: 'Hoàn thành'
    })

    alert(`✅ Tạo đơn thành công! Tồn kho và Voucher đã tự động cập nhật.`)
    cart.value = []
  }
}

const formatMoney = (val: any) => `${(Number(val) || 0).toLocaleString('vi-VN')} ₫`
const formatVNTime = (isoString: string) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return isoString; 
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(date.getHours())}:${pad(date.getMinutes())} ${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
}

const switchTab = (t: string) => { activeTab.value = t; searchQuery.value = '' }

const menuItems = [
  { id: 'orders', name: 'Hóa đơn', icon: 'bi-receipt' },
  { id: 'products', name: 'Sản phẩm', icon: 'bi-box-seam' },
  { id: 'promotions', name: 'Khuyến mãi', icon: 'bi-ticket-perforated' },
  { id: 'customers', name: 'Khách hàng', icon: 'bi-people' },
  { id: 'employees', name: 'Nhân sự', icon: 'bi-person-badge' },
  { id: 'settings', name: 'Cài đặt', icon: 'bi-gear' },
]

const pageTitle = computed(() => {
  if(activeTab.value === 'pos') return 'Bán hàng'
  if(activeTab.value === 'dashboard') return 'Tổng quan'
  return menuItems.find(m => m.id === activeTab.value)?.name || 'Quản trị'
})

const dashboardStats = [
  { title: 'Doanh thu', value: '352.4M', icon: 'bi-wallet2' },
  { title: 'Đơn hàng', value: '101', icon: 'bi-receipt-cutoff' },
  { title: 'Khách hàng', value: '12', icon: 'bi-people-fill' },
  { title: 'Sản phẩm', value: '32', icon: 'bi-box-seam' }
]

interface SchemaCol { key: string, label: string, type?: string, options?: string[] }
const schemas: Record<string, SchemaCol[]> = {
  products: [
    { key: 'id', label: 'SKU' }, { key: 'name', label: 'Tên Sản phẩm' }, 
    { key: 'itemType', label: 'Loại', options: ['Điện thoại', 'Phụ kiện'] }, 
    { key: 'color', label: 'Màu' }, { key: 'stock', label: 'Tồn', type: 'number' },
    { key: 'price', label: 'Đơn Giá', type: 'money' }, { key: 'status', label: 'Trạng thái', type: 'status' }
  ],
  promotions: [
    { key: 'id', label: 'Mã Voucher' }, { key: 'name', label: 'Tên CT' },
    { key: 'discount', label: 'Giảm (%)', type: 'percent' }, { key: 'maxAmount', label: 'Giảm tối đa', type: 'money' },
    { key: 'applyTo', label: 'Phạm vi', options: ['Tất cả đơn hàng', 'Chỉ Điện thoại', 'Chỉ Phụ kiện'] },
    { key: 'usageLimit', label: 'Lượt còn', type: 'number' }, { key: 'status', label: 'Trạng thái', type: 'status' }
  ],
  orders: [
    { key: 'id', label: 'Mã Đơn' }, { key: 'createdAt', label: 'Thời gian', type: 'datetime' },
    { key: 'customer', label: 'Khách hàng' }, { key: 'total', label: 'Tổng tiền', type: 'money' },
    { key: 'status', label: 'Trạng thái', type: 'status' }
  ],
  customers: [
    { key: 'id', label: 'Mã KH' }, { key: 'name', label: 'Khách hàng' },
    { key: 'phone', label: 'SĐT' }, { key: 'totalSpent', label: 'Đã mua (VNĐ)', type: 'money' }, { key: 'status', label: 'Trạng thái', type: 'status' }
  ],
  employees: [
    { key: 'id', label: 'Mã NV' }, { key: 'name', label: 'Tên nhân viên' },
    { key: 'role', label: 'Vai trò', options: ['Admin', 'Nhân viên Sale', 'Kho'] }, { key: 'status', label: 'Trạng thái', type: 'status' }
  ],
  settings: [
    { key: 'id', label: 'Mã' }, { key: 'name', label: 'Tên cấu hình' }, { key: 'value', label: 'Giá trị' }, { key: 'status', label: 'Trạng thái', type: 'status' }
  ]
}
const currentSchema = computed(() => schemas[activeTab.value] || [{ key: 'id', label: 'ID' }, { key: 'name', label: 'Tên' }])

const filteredData = computed(() => {
  const data = db[activeTab.value] || []
  if (!searchQuery.value) return data
  const lowerQuery = searchQuery.value.toLowerCase()
  return data.filter(item => Object.values(item).some(val => String(val).toLowerCase().includes(lowerQuery)))
})

const showModal = ref(false)
const modalMode = ref<'add' | 'edit'>('add')
const formData = ref<Record<string, any>>({})

const openModal = (mode: 'add' | 'edit', item: any = null) => {
  modalMode.value = mode
  if (mode === 'edit' && item) {
    formData.value = { ...item }
  } else {
    formData.value = {}
    currentSchema.value.forEach(col => {
      if (col.type === 'number' || col.type === 'money' || col.type === 'percent') formData.value[col.key] = 0
      else if (col.options) formData.value[col.key] = col.options[0] 
      else formData.value[col.key] = ''
    })
    if(activeTab.value !== 'promotions') formData.value.id = `${activeTab.value.charAt(0).toUpperCase()}${Date.now().toString().slice(-4)}`
    formData.value.status = 'Hoạt động'

    if (currentSchema.value.some(col => col.type === 'datetime')) {
      const now = new Date();
      const offset = now.getTimezoneOffset() * 60000;
      const localISOTime = (new Date(now.getTime() - offset)).toISOString().slice(0, 16);
      const dateField = currentSchema.value.find(col => col.type === 'datetime')?.key;
      if (dateField) formData.value[dateField] = localISOTime;
    }
  }
  showModal.value = true
}

const closeModal = () => { showModal.value = false }
const saveData = () => {
  const list = db[activeTab.value as keyof typeof db] as any[]
  if (modalMode.value === 'add') list.push({ ...formData.value })
  else {
    const idx = list.findIndex(i => i.id === formData.value.id)
    if (idx !== -1) list[idx] = { ...formData.value }
  }
  closeModal()
}
const deleteItem = (id: string) => {
  if (confirm('Bạn có chắc chắn muốn xóa dữ liệu này?')) {
    const key = activeTab.value as keyof typeof db
    db[key] = (db[key] as any[]).filter((i:any) => i.id !== id) as any
  }
}
</script>

<style scoped>
/* === DESIGN SYSTEM: MODERN CLOUD SAAS === */
.text-slate-400 { color: #94a3b8 !important; }
.text-slate-500 { color: #64748b !important; }
.text-slate-600 { color: #475569 !important; }
.text-slate-700 { color: #334155 !important; }
.text-slate-800 { color: #1e293b !important; }

.bg-slate-50 { background-color: #f8fafc !important; }
.bg-slate-100 { background-color: #f1f5f9 !important; }
.border-slate-100 { border-color: #f1f5f9 !important; }
.border-slate-200 { border-color: #e2e8f0 !important; }

/* Theme Colors: Indigo & Emerald */
.text-indigo { color: #6366f1 !important; }
.bg-indigo { background-color: #6366f1 !important; }
.bg-indigo-50 { background-color: #eef2ff !important; }
.btn-indigo { background-color: #6366f1; color: white; border: none; }
.btn-indigo:hover { background-color: #4f46e5; color: white; }
.btn-indigo-light { background-color: #eef2ff; color: #6366f1; border: none; }
.btn-indigo-light:hover { background-color: #6366f1; color: white; }
.shadow-indigo { box-shadow: 0 4px 14px 0 rgba(99, 102, 241, 0.3); }

.text-emerald-600 { color: #059669 !important; }
.bg-emerald-50 { background-color: #ecfdf5 !important; }

.fw-black { font-weight: 900 !important; }
.fw-bolder { font-weight: 800 !important; }
.tracking-tight { letter-spacing: -0.025em; }
.tracking-wider { letter-spacing: 0.05em; }

/* Navigation */
.top-nav-glass {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  height: 70px;
}
.nav-pill { color: #64748b; border-radius: 50px; padding: 6px 16px; font-size: 0.85rem; border: none; background: transparent; }
.nav-pill.active { background-color: #ffffff; color: #1e293b !important; }
.hover-text-dark:hover { color: #1e293b !important; }

/* Utilities & Animations */
.cursor-pointer { cursor: pointer; }
.transition-all { transition: all 0.2s ease-in-out; }
.hover-lift { transition: transform 0.2s, box-shadow 0.2s; }
.hover-lift:hover { transform: translateY(-2px); }
.hover-shake:hover { transform: scale(1.15); }
.hover-bg-white:hover { background-color: #ffffff !important; }
.hover-bg-slate:hover { background-color: #f8fafc !important; }

.focus-ring-indigo:focus-within, .focus-ring-indigo:focus { 
  border-color: #818cf8 !important; 
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15) !important; 
  background-color: #ffffff !important;
}

/* POS Cards & Cart */
.product-card { border: 1px solid transparent; }
.product-card:hover { border-color: rgba(99, 102, 241, 0.3); box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05) !important; }
.cart-item-card { border: 1px solid transparent; }
.cart-item-card:hover { border-color: #e2e8f0; }

.btn-remove-item { width: 26px; height: 26px; padding: 0; top: -8px; right: -8px; opacity: 0; transition: opacity 0.2s; }
.cart-item-card:hover .btn-remove-item { opacity: 1; }

.btn-action { width: 34px; height: 34px; padding: 0; display: inline-flex; align-items: center; justify-content: center; }
.btn-white { background-color: #ffffff; border-color: #e2e8f0; color: #475569; }
.btn-white:hover { background-color: #f8fafc; }

/* Table Clean */
.modern-table th { border-top: none; }
.modern-table td { border-bottom: none; }

/* Scrollbar */
.custom-scrollbar::-webkit-scrollbar { width: 5px; height: 5px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }

/* Modals & Transitions */
.modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: rgba(15, 23, 42, 0.4); z-index: 1050; backdrop-filter: blur(2px); }
.modal-content-custom { width: 100%; max-width: 480px; max-height: 90vh; }

.fade-slide-enter-active, .fade-slide-leave-active { transition: opacity 0.3s, transform 0.3s; }
.fade-slide-enter-from { opacity: 0; transform: translateY(10px); }
.fade-slide-leave-to { opacity: 0; transform: translateY(-10px); }

.fade-scale-enter-active, .fade-scale-leave-active { transition: opacity 0.2s, transform 0.2s; }
.fade-scale-enter-from, .fade-scale-leave-to { opacity: 0; transform: scale(0.95); }

/* List transition for cart items */
.list-enter-active, .list-leave-active { transition: all 0.3s ease; }
.list-enter-from, .list-leave-to { opacity: 0; transform: translateX(30px); }
</style>