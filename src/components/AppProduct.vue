<template>
  <div>
    <div class="product-list">
      <div 
        v-for="product in paginatedProducts" 
        :key="product.id" 
        class="product-item"
        @click="goToProductDetail(product.id)">
        <h2>{{ product.name }}</h2>
        <img :src="product.image" :alt="product.name">
        <p>{{ product.description }}</p>
        <p>{{ product.price.toLocaleString() }} VNĐ</p>
        <p v-if="isOutOfStock(product)">Hết hàng</p>
        <p v-else> Còn {{ getTotalStock(product) }} sản phẩm</p>
      </div>
    </div>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Trang {{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'AppProduct',
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 10, // Đặt số sản phẩm mỗi trang là 10
    };
  },
  computed: {
    ...mapState(['items']),
    paginatedProducts() {
      if (Array.isArray(this.items)) {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.items.slice(start, end);
      }
      return [];
    },
    totalPages() {
      if (Array.isArray(this.items)) {
        return Math.ceil(this.items.length / this.itemsPerPage);
      }
      return 1;
    }
  },
  methods: {
    goToProductDetail(productId) {
      this.$router.push({ name: 'ProductDetail', params: { id: productId } });
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage += 1;
      }
    },
    isOutOfStock(product) {
      return product.sizes.every(size => size.quantity === 0);
    },
    getTotalStock(product) {
      return product.sizes.reduce((total, size) => total + size.quantity, 0);
    }
  }
};
</script>





<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px; /* khoảng cách giữa các sản phẩm */
  justify-content: center; /* Canh giữa các sản phẩm */
}
.product-item { 
  width: calc(100% / 5 - 32px); /* Đặt chiều rộng cho mỗi sản phẩm và tính toán khoảng cách */
  box-sizing: border-box;
  border: 1px solid #ccc; 
  padding: 16px; 
  text-align: center;
  border-radius: 8px;
  overflow: hidden; 
  transition: transform 0.3s ease; 
  cursor: pointer; /* Thêm con trỏ pointer để biểu thị rằng sản phẩm có thể nhấp vào */
} 
.product-item img { 
  width: 100%; 
  height: auto; 
  border-bottom: 1px solid #ccc; 
  margin-bottom: 8px; 
}
.product-item-info { 
  padding: 8px; 
} 
.product-item:hover { 
  transform: scale(1.05); 
} 
.pagination { 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  margin-top: 20px; 
} 
.pagination button { 
  margin: 0 5px; 
  padding: 5px 10px;
} 
.product-link { 
  color: black; /* Đặt màu chữ thành màu đen */ 
  text-decoration: none; /* Không có gạch chân */ 
} 
.product-link:visited, .product-link:hover { 
  color: black; /* Màu không thay đổi khi đã chọn và khi hover */ 
  text-decoration: none; /* Không có gạch chân khi hover */ 
}
</style>





