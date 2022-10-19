import './bootstrap';
import '../css/app.css';

import {createApp, h} from 'vue';
import {createInertiaApp} from '@inertiajs/inertia-vue3';
import {InertiaProgress} from '@inertiajs/progress';
import {resolvePageComponent} from 'laravel-vite-plugin/inertia-helpers';
import {ZiggyVue} from '../../vendor/tightenco/ziggy/dist/vue.m';
import Vuex from 'vuex'
import VueRouter from 'vue-router'

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';
const router = new VueRouter({
    mode: 'history',
    routes: require('./routes.js')
})
const store = new Vuex.Store({
    state: {
        products: [],
        cart: [],
        order: {},
    },
    mutations: {
        updateProducts(state, products) {
            state.products = products
        },
        addToCart(state, product) {
            let productInCartIndex = state.cart.findIndex(item =>
                item.slug === product.slug);
            if (productInCartIndex === -1) {
                state.cart[productInCartIndex].qty++;
                return;
            }
            product.qty = 1;
            state.cart.push(product)
        },
        removeFromCart(state, index) {
            state.cart.splice(index, 1)
        },
        updateOrder(state, order) {
            state.order = order
        },
        updateCart(state, cart) {
            state.cart = cart
        },

    },
    actions: {
        getProducts({commit}) {
            axios.get('/api/products')
                .then((response) => {
                    commit('updateProducts', response.data)
                }).catch((error) => console.log(error));
        },
        clearCart({commit}) {
            commit('updateCart', [])
        },

    }
})
createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({el, app, props, plugin}) {
        return createApp({render: () => h(app, props)})
            .use(plugin)
            .use(Vuex)
            .use(VueRouter)
            .use(ZiggyVue, Ziggy)
            .mount(el);

    },
});

InertiaProgress.init({color: '#4B5563'});
