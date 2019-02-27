import { sync } from 'vuex-router-sync';

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
      path: '/:legendSlug/:cardSlug?',
      component: LegendView
    }
  ]
});

sync(store, router);

new Vue({
  el: '#app',
  mounted(){
    // Send to mainpage
    if(this.$route.path !== "/" && this.$store.state.legends.length === 0){
      this.$router.replace('/');
    }
    // Load legends
    if(this.$store.state.legends.length === 0) {
      this.$store.dispatch('loadLegenden');
    }
  },
  render: h => h(App),
  store,
  router
});