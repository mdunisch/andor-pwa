// Polyfills
import 'array-flat-polyfill';

// Main App
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import { UiToolbar, UiIconButton, UiButton, UiMenu, UiIcon } from 'keen-ui';

Vue.component('ui-toolbar', UiToolbar);
Vue.component('ui-icon-button', UiIconButton);
Vue.component('ui-button', UiButton);
Vue.component('ui-menu', UiMenu);
Vue.component('ui-icon', UiIcon);

import App from './components/App';
import store from './store';

import LegendList  from './components/LegendList/LegendList.vue'
import LegendView  from './components/LegendView/LegendView.vue'

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: LegendList },
    { path: '/legends/:slug', component: LegendView }
  ] 
})

new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
});