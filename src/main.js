import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './data/store.js';
import items from './data/items.js';

const app = createApp(App);

app.use(store);
app.use(router);

app.provide('items', items);

app.mount('#app');
