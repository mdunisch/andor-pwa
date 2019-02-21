// Polyfills
import 'array-flat-polyfill';

// Main App
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import 'keen-ui/dist/keen-ui.css';

import KeenUI from 'keen-ui';
Vue.use(KeenUI);

import App from './components/App';
import store from './store';

import LegendList from './components/LegendList/LegendList.vue'
import LegendView from './components/LegendView/LegendView.vue'

const router = new VueRouter({
  mode: 'history',
  routes: [{
      path: '/',
      component: LegendList
    },
    {
      path: '/legends/:slug',
      component: LegendView
    }
  ]
});

new Vue({
  el: '#app',
  watch: {
    $route(to) {
      this.$store.commit('openlegend', to.params.slug || false);
    }
  },
  // Set init state
  beforeCreate(){
    this.$store.commit('openlegend', this.$route.params.slug || false);
  },
  render: h => h(App),
  store,
  router
});