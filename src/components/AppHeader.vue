<template>
  <nav class="navbar">
    <div class="nav-inner">
      <div class="logo" @click="goToHome">
        <img src="@/assets/images/Logo.png" alt="Logo">
      </div>
      <div class="links">
        <router-link to="/">Trang chủ</router-link>
        <router-link to="/lienhe">Liên hệ</router-link>
        <router-link to="/tintuc">Tin tức</router-link>
      </div>
      <div class="icons">
        <button @click="goToSearch" class="nav-button">
          <svg class="icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
            </svg>
          Tìm kiếm
        </button>
        <span class="user" v-if="!isLoggedIn">
          <router-link to="/login">
            <button class="nav-button">
              <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M12 4a4 4 0 100 8 4 4 0 000-8zM10 13a4 4 0 00-4 4v1a2 2 0 002 2h8a2 2 0 002-2v-1a4 4 0 00-4-4h-4z" clip-rule="evenodd"/>
              </svg>
              Đăng nhập/Đăng ký
            </button>
          </router-link>
        </span>
        <span class="user" v-else>
          <span @click="toggleDropdown" @blur="closeDropdown" tabindex="0">
            <button class="nav-button">
              <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M12 4a4 4 0 100 8 4 4 0 000-8zM10 13a4 4 0 00-4 4v1a2 2 0 002 2h8a2 2 0 002-2v-1a4 4 0 00-4-4h-4z" clip-rule="evenodd"/>
              </svg>
              Xin chào, {{ user?.fullName }}
            </button>
            <div v-if="showDropdown" class="dropdown">
              <button class="nav-button" @click="logout">Đăng xuất</button>
            </div>
          </span>
        </span>
        <span class="cart">
          <router-link to="/cart" class="nav-button">
            <svg class="icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M4 4a1 1 0 0 1 1-1h1.5a1 1 0 0 1 .979.796L7.939 6H19a1 1 0 0 1 .979 1.204l-1.25 6a1 1 0 0 1-.979.796H9.605l.208 1H17a3 3 0 1 1-2.83 2h-2.34a3 3 0 1 1-4.009-1.76L5.686 5H5a1 1 0 0 1-1-1Z" clip-rule="evenodd"/>
          </svg>
            Giỏ hàng
            <span class="cart-count">{{ cartItemCount }}</span>
          </router-link>
        </span>
      </div>
    </div>
  </nav>
  <router-view/>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'AppHeader',
  data() {
    return {
      showDropdown: false
    };
  },
  computed: {
    ...mapGetters(['cartItemCount', 'isLoggedIn', 'user'])
  },
  methods: {
    ...mapActions(['setLoginStatus']),
    goToHome() {
      this.$router.push('/');
    },
    goToSearch() {
      this.$router.push('/search');
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    closeDropdown() {
      setTimeout(() => {
        this.showDropdown = false;
      }, 200); // Đợi một chút trước khi đóng dropdown để cho phép người dùng click
    },
    logout() {
      this.setLoginStatus({ status: false, user: null });
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.navbar {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: auto;
}

.logo img {
  height: 80px;
  cursor: pointer;
}

.links {
  display: flex;
  gap: 20px;
}

.links a {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  padding: 10px 15px;
  border-radius: 5px;
  text-decoration: none;
  transition: text-decoration 0.3s;
}

.links a:hover {
  text-decoration: underline;
}

.icons {
  display: flex;
  gap: 20px;
  align-items: center;
}

.nav-button,
.cart-link {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: transparent;
  color: black;
  cursor: pointer;
  font-size: 16px;
  transition: text-decoration 0.3s;
  text-decoration: none;
}

.nav-button:hover,
.cart-link:hover {
  text-decoration: underline;
}

.nav-button:focus,
.cart-link:focus {
  outline: none;
  box-shadow: none;
}

.icon {
  width: 24px;
  height: 24px;
  margin-right: 5px;
}

.user {
  display: flex;
  align-items: center;
  position: relative;
}

.dropdown {
  position: absolute;
  top: 40px;
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 10px;
}

.cart {
  position: relative;
}

.cart-count {
  position: absolute;
  top: 1px;
  right: -5px;
  background-color: black;
  color: white;
  border-radius: 50%;
  padding: 5px 8px;
  font-size: 12px;
  font-weight: 700;
}
</style>
