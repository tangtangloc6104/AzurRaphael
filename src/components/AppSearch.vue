<template>
    <div class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        @input="searchProducts"
        placeholder="Tìm kiếm sản phẩm..."
        class="search-input"
      />
      <div v-if="searchResults.length" class="search-results">
        <div
          v-for="product in searchResults"
          :key="product.id"
          class="search-result-item"
          @click="goToProductDetail(product.id)"
        >
          <img :src="product.image" :alt="product.name" />
          <div>
            <h2>{{ product.name }}</h2>
            <p>{{ product.description }}</p>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Không tìm thấy sản phẩm nào phù hợp với từ khóa "{{ searchQuery }}".</p>
      </div>
    </div>
  </template>

<script>
import { mapState } from 'vuex';

export default {
  name: "AppSearch",
  data() {
    return {
      searchQuery: "",
      searchResults: []
    };
  },
  computed: {
    ...mapState(['items'])
  },
  methods: {
    searchProducts() {
      const query = this.searchQuery.toLowerCase();
      this.searchResults = this.items.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    },
    goToProductDetail(productId) {
      this.$router.push({ name: 'ProductDetail', params: { id: productId } });
    }
  }
};
</script>


<style scoped>
.search-container {
  padding: 20px;
  text-align: center;
}

.search-input {
  width: 80%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
}

.search-results {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search-result-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-result-item:hover {
  background-color: #f9f9f9;
}

.search-result-item img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 10px;
}

.search-result-item h2 {
  font-size: 16px;
  margin: 0;
}

.search-result-item p {
  margin: 0;
  font-size: 14px;
  color: #666;
}
</style>

  