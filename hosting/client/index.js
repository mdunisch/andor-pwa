import Vue from 'vue';

import { UiToolbar, UiIconButton, UiMenu } from 'keen-ui';

Vue.component('ui-toolbar', UiToolbar);
Vue.component('ui-icon-button', UiIconButton);
Vue.component('ui-menu', UiMenu);

import App from './components/App';
import store from './store';

new Vue({
  el: '#app',
  render: h => h(App),
  store
});