<template>
  <div class="login-container">
    <h1>Đăng nhập</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">Tên đăng nhập</label>
        <input 
          type="text" 
          id="username" 
          v-model="form.username" 
          placeholder="Nhập tên đăng nhập" 
          required 
        />
      </div>
      <div class="form-group">
        <label for="password">Mật khẩu</label>
        <input 
          type="password" 
          id="password" 
          v-model="form.password" 
          placeholder="Nhập mật khẩu" 
          required 
        />
      </div>
      <button type="submit">Đăng nhập</button>
    </form>
    <p class="register-link">
      Bạn chưa có tài khoản? 
      <router-link to="/register" class="highlight">Đăng ký</router-link>
    </p>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  name: "AppLogin",
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions(['setLoginStatus']),
    async handleLogin() {
      if (this.form.username && this.form.password) {
        try {
          const response = await axios.post('http://localhost:3000/api/login', this.form);
          console.log("Đăng nhập thành công với tài khoản:", this.form);
          this.setLoginStatus({ status: true, user: response.data.account });
          this.$router.push('/');
        } catch (error) {
          if (error.response && error.response.status === 401) {
            alert("Tên đăng nhập hoặc mật khẩu không chính xác.");
          } else {
            console.error('Error during login:', error);
          }
        }
      } else {
        alert("Vui lòng nhập đầy đủ thông tin!");
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #0056b3;
}

.register-link {
  margin-top: 15px;
}

.highlight {
  color: #007bff;
  text-decoration: none;
}

.highlight:hover {
  text-decoration: underline;
}
</style>
