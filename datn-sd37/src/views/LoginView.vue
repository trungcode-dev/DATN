<template>
  <div class="auth-page d-flex flex-column align-items-center">
    <div class="auth-card bg-white rounded-3 shadow-sm p-4 p-md-5">
      
      <div class="text-center mb-4">
        <h1 class="fw-bold mb-0 tracking-wide text-dark" style="letter-spacing: 0.3em; font-size: 2.5rem;">LATRA</h1>
      </div>

      <div class="mb-4">
        <h4 class="fw-normal mb-1">{{ isLogin ? 'Đăng nhập' : 'Tạo tài khoản' }}</h4>
        <p class="text-secondary small">
          {{ isLogin ? 'Đăng nhập hoặc tạo tài khoản mới' : 'Điền thông tin bên dưới để đăng ký' }}
        </p>
      </div>

      <button class="btn w-100 text-white fw-medium py-2 mb-4 btn-purple">
        Tiếp tục với Shop
      </button>

      <div class="divider d-flex align-items-center mb-4">
        <hr class="flex-grow-1 border-light-subtle m-0">
        <span class="px-3 text-secondary small">hoặc</span>
        <hr class="flex-grow-1 border-light-subtle m-0">
      </div>

      <form v-if="isLogin" @submit.prevent="handleLogin">
        <div class="mb-3">
          <input type="email" class="form-control custom-input" placeholder="Email" v-model="loginForm.email" required>
        </div>
        <div class="mb-3">
          <input type="password" class="form-control custom-input" placeholder="Mật khẩu" v-model="loginForm.password" required>
        </div>

        <div class="d-flex justify-content-end mb-4">
          <a href="#" class="text-secondary small text-decoration-none hover-underline">Quên mật khẩu?</a>
        </div>

        <button type="submit" class="btn btn-dark w-100 fw-medium py-2 mb-3 btn-black">
          Đăng nhập
        </button>
      </form>

      <form v-else @submit.prevent="handleRegister">
        <div class="mb-3">
          <input type="text" class="form-control custom-input" placeholder="Họ và tên" v-model="registerForm.name" required>
        </div>
        <div class="mb-3">
          <input type="email" class="form-control custom-input" placeholder="Email" v-model="registerForm.email" required>
        </div>
        <div class="mb-3">
          <input type="password" class="form-control custom-input" placeholder="Mật khẩu" v-model="registerForm.password" required>
        </div>
        <div class="mb-4">
          <input type="password" class="form-control custom-input" placeholder="Xác nhận mật khẩu" v-model="registerForm.confirmPassword" required>
        </div>

        <button type="submit" class="btn btn-dark w-100 fw-medium py-2 mb-3 btn-black">
          Tạo tài khoản
        </button>
      </form>

      <div class="form-check custom-checkbox mb-4 d-flex align-items-center justify-content-center">
        <input class="form-check-input mt-0 me-2" type="checkbox" id="newsCheckbox" checked>
        <label class="form-check-label text-dark small" for="newsCheckbox">
          Gửi cho tôi tin tức và ưu đãi qua email
        </label>
      </div>

      <div class="text-center mb-3">
        <a href="#" class="text-dark small text-decoration-none fw-medium hover-underline" @click.prevent="toggleMode">
          {{ isLogin ? 'Chưa có tài khoản? Đăng ký ngay' : 'Đã có tài khoản? Đăng nhập' }}
        </a>
      </div>

      <div class="text-center">
        <p class="text-secondary mb-0" style="font-size: 0.75rem;">
          Bằng cách tiếp tục, bạn đồng ý với <a href="#" class="text-secondary text-decoration-underline">Điều khoản dịch vụ</a> của chúng tôi.
        </p>
      </div>
    </div>

    <div class="mt-auto mb-4">
      <a href="#" class="text-dark text-decoration-none small">Chính sách bảo mật</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const isLogin = ref(true);

const toggleMode = () => {
  isLogin.value = !isLogin.value;
};

const loginForm = reactive({ email: '', password: '' });
const registerForm = reactive({ name: '', email: '', password: '', confirmPassword: '' });

const handleLogin = () => {
  console.log('Đăng nhập với:', loginForm.email, loginForm.password);
  // Thực hiện gọi API đăng nhập ở đây
};

const handleRegister = () => {
  if (registerForm.password !== registerForm.confirmPassword) {
    alert('Mật khẩu xác nhận không khớp!');
    return;
  }
  console.log('Đăng ký tài khoản mới:', registerForm);
  // Thực hiện gọi API đăng ký ở đây
};
</script>

<style scoped>
.auth-page {
  background-color: #f6f6f6;
  font-family: 'Inter', -apple-system, sans-serif;
  
  /* CHE NAVBAR VÀ FOOTER */
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  overflow-y: auto;
  
  /* Căn giữa theo chiều ngang và trải đều theo chiều dọc */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.auth-card {
  width: 100%;
  max-width: 440px; 
  border-radius: 12px !important; 
  margin-top: 10vh; /* Cách lề trên giống ảnh mẫu */
  margin-bottom: 2rem;
}

.btn-purple {
  background-color: #5a31f4;
  border: none;
  border-radius: 6px;
  transition: opacity 0.2s ease;
}
.btn-purple:hover {
  background-color: #5a31f4;
  opacity: 0.9;
}

.btn-black {
  background-color: #000;
  border-color: #000;
  border-radius: 6px;
}
.btn-black:hover {
  background-color: #333;
  border-color: #333;
}

.custom-input {
  border: 1px solid #d1d1d1;
  border-radius: 6px;
  padding: 12px 14px; 
  font-size: 0.95rem;
  color: #000;
  transition: all 0.2s ease;
}
.custom-input:focus {
  border-color: #000;
  box-shadow: none;
  outline: none;
  border-width: 1.5px;
}

.custom-checkbox .form-check-input {
  border-color: #000;
  border-radius: 3px;
  cursor: pointer;
}
.custom-checkbox .form-check-input:checked {
  background-color: #000;
  border-color: #000;
}
.custom-checkbox label {
  cursor: pointer;
}

.hover-underline:hover {
  text-decoration: underline !important;
}
</style>