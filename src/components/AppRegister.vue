<template>
    <div class="register-container">
      <h1>Đăng ký tài khoản</h1>
      <form @submit.prevent="handleRegister">
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
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            v-model="form.email" 
            placeholder="Nhập email" 
            required 
          />
        </div>
        <div class="form-group">
          <label for="fullName">Họ và tên</label>
          <input 
            type="text" 
            id="fullName" 
            v-model="form.fullName" 
            placeholder="Nhập họ và tên" 
            required 
          />
        </div>
        <button type="submit">Đăng ký</button>
      </form>
      <p class="login-link">
        Bạn đã có tài khoản? 
        <router-link to="/login" class="highlight">Đăng nhập</router-link>
      </p>
    </div>
  </template>
    

<script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  name: "AppRegister",
  data() {
    return {
      form: {
        username: "",
        password: "",
        email: "",
        fullName: ""
      },
      accounts: []
    };
  },
  created() {
    this.fetchAccounts();
  },
  methods: {
    ...mapActions(['setLoginStatus']),
    async fetchAccounts() {
      try {
        const response = await axios.get('http://localhost:3000/api/accounts');
        this.accounts = response.data;
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    },
    async handleRegister() {
      const existingAccount = this.accounts.find(acc => acc.username === this.form.username);
      if (existingAccount) {
        alert("Tên đăng nhập đã được sử dụng.");
        return;
      }

      const newAccount = {
        username: this.form.username,
        password: this.form.password,
        email: this.form.email,
        fullName: this.form.fullName,
        createdAt: new Date().toISOString()
      };

      try {
        await axios.post('http://localhost:3000/api/accounts', newAccount);
        console.log("Đăng ký thành công với tài khoản:", newAccount);
        alert("Đăng ký thành công! Bây giờ bạn có thể đăng nhập.");
        this.$router.push('/login');
      } catch (error) {
        console.error('Error registering account:', error);
        alert('Đăng ký thất bại. Vui lòng thử lại.');
      }
    }
  }
};
</script>
    
<style scoped>
.register-container {
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

.login-link {
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
