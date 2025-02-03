<template>
  <div v-if="product" class="product-container">
    <div class="product-image-wrapper">
      <img :src="product.image" :alt="product.name" />
    </div>
    <div class="product-details">
      <h1>{{ product.name }}</h1>
      <p>{{ product.description }}</p>
      <p>Giá: {{ product.price.toLocaleString() }} VNĐ</p>
      <p>Số lượng trong kho: 
        <span v-if="product.selectedSize">
          {{ selectedSizeQuantity }}
        </span>
        <span v-else>
          Vui lòng chọn size
        </span>
      </p>
      <p>Size:</p>
      <div class="size-selection">
        <button 
          v-for="(size, index) in product.sizes" 
          :key="index"
          :class="{'selected': product.selectedSize === size.size}"
          @click="selectSize(size.size)">
          {{ size.size }}
        </button>
      </div>
      
      <!-- Add to Cart Button -->
      <button 
        v-if="isLoggedIn && product.selectedSize && selectedSizeQuantity > 0" 
        class="add-to-cart" 
        @click="handleAddToCart" 
        :disabled="!product.selectedSize">
        Thêm vào giỏ hàng
      </button>
      <p v-else-if="isLoggedIn && product.selectedSize && selectedSizeQuantity === 0" class="out-of-stock-message">
        Hết hàng
      </p>
      <p v-if="!isLoggedIn" class="error-message">Vui lòng đăng nhập để thêm vào giỏ hàng</p>
      <p v-if="!product.selectedSize && isLoggedIn" class="error-message">Vui lòng chọn size</p>
    </div>
  </div>
  <div v-else>
    <p>Product not found</p>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'ProductDetail',
  props: ['id'],
  data() {
    return {
      product: null,
    };
  },
  created() {
    this.fetchProduct();
  },
  computed: {
    ...mapState(['items', 'isLoggedIn']),
    selectedSizeQuantity() {
      if (this.product && this.product.selectedSize) {
        const size = this.product.sizes.find(size => size.size === this.product.selectedSize);
        return size ? size.quantity : 0;
      }
      return 0;
    }
  },
  methods: {
    ...mapActions(['addToCart']),
    fetchProduct() {
      const productId = parseInt(this.id || this.$route.params.id);
      this.product = this.items.find(item => item.id === productId);
    },
    selectSize(size) {
      this.product.selectedSize = size;
    },
    handleAddToCart() {
      if (this.product.selectedSize && this.isLoggedIn) {
        this.addToCart({ product: this.product, size: this.product.selectedSize });
      } else if (!this.isLoggedIn) {
        alert("Vui lòng đăng nhập để thêm vào giỏ hàng");
        this.$router.push('/login');
      }
    }
  }
};
</script>
<style>
.product-container {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  justify-content: center;
  margin: 0 auto;
  max-width: 800px;
}
.product-image-wrapper {
  width: 500px;
  height: 500px;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
}
.product-image-wrapper img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}
.product-details {
  flex: 1;
  text-align: left;
}
.size-selection {
  margin-top: 10px;
}
.size-selection button {
  margin-right: 5px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;
}
.size-selection button.selected {
  background-color: black;
  color: white;
}
.add-to-cart {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.add-to-cart:hover {
  background-color: #333;
}
.add-to-cart:disabled {
  background-color: grey;
  cursor: not-allowed;
}
.error-message, .out-of-stock-message {
  color: red;
  margin-top: 10px;
}
</style>
