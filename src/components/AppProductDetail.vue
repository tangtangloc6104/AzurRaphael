<template>
  <div v-if="product" class="product-container">
    <div class="product-image-wrapper">
      <img :src="product.image" :alt="product.name" />
    </div>
    <div class="product-details">
      <h1>{{ product.name }}</h1>
      <p class="description">{{ product.description }}</p>
      <p class="price">Giá: {{ product.price.toLocaleString() }} VNĐ</p>
      <p class="stock">
        Số lượng trong kho: 
        <span v-if="product.selectedSize">
          {{ selectedSizeQuantity }}
        </span>
        <span v-else>
          Vui lòng chọn size
        </span>
      </p>
      <p class="size-label">Size:</p>
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
        // Giảm số lượng trong kho
        const size = this.product.sizes.find(size => size.size === this.product.selectedSize);
        if (size) {
          size.quantity -= 1;
        }
      } else if (!this.isLoggedIn) {
        alert("Vui lòng đăng nhập để thêm vào giỏ hàng");
        this.$router.push('/login');
      }
    }
  }
};
</script>

<style scoped>
.product-container {
  display: flex;
  gap: 40px;
  align-items: flex-start;
  justify-content: center;
  margin: 0 auto;
  max-width: 1200px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.product-image-wrapper {
  width: 500px;
  height: 500px;
  border: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 10px;
  background-color: white;
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

.product-details h1 {
  font-size: 2.5em;
  margin-bottom: 10px;
  color: #333;
}

.product-details .description {
  font-size: 1.2em;
  margin-bottom: 20px;
  color: #666;
}

.product-details .price {
  font-size: 1.5em;
  margin-bottom: 20px;
  color: #e74c3c;
}

.product-details .stock {
  font-size: 1.1em;
  margin-bottom: 20px;
  color: #333;
}

.product-details .size-label {
  font-size: 1.1em;
  margin-bottom: 10px;
  color: #333;
}

.size-selection {
  margin-bottom: 20px;
}

.size-selection button {
  margin-right: 10px;
  padding: 10px 15px;
  border: 1px solid #ddd;
  background-color: white;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}

.size-selection button.selected {
  background-color: #333;
  color: white;
}

.size-selection button:hover {
  background-color: #555;
  color: white;
}

.add-to-cart {
  padding: 15px 30px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2em;
  transition: background-color 0.3s;
}

.add-to-cart:hover {
  background-color: #c0392b;
}

.add-to-cart:disabled {
  background-color: grey;
  cursor: not-allowed;
}

.error-message, .out-of-stock-message {
  color: red;
  margin-top: 10px;
  font-size: 1.1em;
}
</style>
