import { createStore } from 'vuex';

const updateItems = (state, { product, size, quantity }) => {
  const storeItem = state.items.find(item => item.id === product.id);
  if (storeItem) {
    const storeSize = storeItem.sizes.find(s => s.size === size);
    if (storeSize) {
      storeSize.quantity += quantity;
    }
  }
};

export default createStore({
  state: {
    cart: [],
    items: items,
    isLoggedIn: false,
    user: null,
  },
  getters: {
    cartItems: state => state.cart,
    cartTotal: state => {
      return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    cartItemCount: state => {
      return state.cart.reduce((total, item) => total + item.quantity, 0);
    },
    getProductById: state => id => {
      return state.items.find(item => item.id === id);
    },
    isLoggedIn: state => state.isLoggedIn,
    user: state => state.user,
  },
  mutations: {
    addToCart(state, { product, size }) {
      const item = state.cart.find(item => item.id === product.id && item.selectedSize === size);
      if (item) {
        item.quantity += 1;
      } else {
        state.cart.push({
          ...product,
          selectedSize: size,
          quantity: 1
        });
      }
      updateItems(state, { product, size, quantity: -1 });
    },
    increaseQuantity(state, { product, size }) {
      const item = state.cart.find(item => item.id === product.id && item.selectedSize === size);
      if (item) {
        item.quantity += 1;
        updateItems(state, { product, size, quantity: -1 });
      }
    },
    decreaseQuantity(state, { product, size }) {
      const item = state.cart.find(item => item.id === product.id && item.selectedSize === size);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
          updateItems(state, { product, size, quantity: 1 });
        } else {
          state.cart = state.cart.filter(cartItem => cartItem.id !== product.id || cartItem.selectedSize !== size);
          updateItems(state, { product, size, quantity: 1 });
        }
      }
    },
    clearCart(state) {
      state.cart = [];
    },
    setLoginStatus(state, { status, user }) {
      state.isLoggedIn = status;
      state.user = user;
    },
    removeFromCart(state, item) {
      state.cart = state.cart.filter(cartItem => cartItem.id !== item.id || cartItem.selectedSize !== item.selectedSize);
      updateItems(state, { product: item, size: item.selectedSize, quantity: item.quantity });
    }
  },
  actions: {
    addToCart({ commit }, payload) {
      commit('addToCart', payload);
    },
    increaseQuantity({ commit }, payload) {
      commit('increaseQuantity', payload);
    },
    decreaseQuantity({ commit }, payload) {
      commit('decreaseQuantity', payload);
    },
    clearCart({ commit }) {
      commit('clearCart');
    },
    setLoginStatus({ commit }, payload) {
      commit('setLoginStatus', payload);
    },
    removeFromCart({ commit }, payload) {
      commit('removeFromCart', payload);
    }
  }
});
