<template>
  <div class="banner-container">
    <div class="banner" @mouseover="pauseScroll" @mouseleave="resumeScroll">
      <div class="banner-item" v-for="(product, index) in loopedProducts" :key="index" @click="goToProductDetail(product.id)">
        <img :src="product.image" :alt="product.name" />
        <div class="product-info">
          <h3>{{ product.name }}</h3>
          <p>{{ product.price.toLocaleString() }} VNĐ</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AppBanner',
  computed: {
    ...mapGetters(['latestProducts']),
    loopedProducts() {
      // Lặp lại các sản phẩm để tạo hiệu ứng cuộn liên tục
      return [...this.latestProducts, ...this.latestProducts];
    }
  },
  methods: {
    pauseScroll() {
      document.querySelector('.banner').style.animationPlayState = 'paused';
    },
    resumeScroll() {
      document.querySelector('.banner').style.animationPlayState = 'running';
    },
    goToProductDetail(productId) {
      this.$router.push({ name: 'ProductDetail', params: { id: productId } });
    }
  }
};
</script>

<style scoped>
.banner-container {
  overflow: hidden;
  position: relative;
  width: 100%;
  background-color: #f4f4f4;
  padding: 10px 0;
}

.banner {
  display: flex;
  animation: scroll 10s linear infinite;
}

.banner-item {
  flex: 0 0 auto;
  width: 200px;
  margin-right: 20px;
  text-align: center;
  cursor: pointer; /* Thêm con trỏ pointer để biểu thị rằng sản phẩm có thể nhấp vào */
}

.banner-item img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.product-info {
  margin-top: 10px;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>