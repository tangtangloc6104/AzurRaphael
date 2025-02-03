import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './data/store.js';
import items from './data/items.json';

const app = createApp(App);

app.use(store);
app.use(router);

app.provide('items', items);

// Commit the mutation to set the items in the store
store.commit('setItems', items);

app.mount('#app');
