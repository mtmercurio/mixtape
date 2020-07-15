import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router';
import '../node_modules/bulma/css/bulma.css';

Vue.config.productionTip = false;

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    your_access_code: 'your_access_code_test',
    their_access_code: 'their_access_code_test',
  },
  mutations: {
    updateYourAccessCode(state, yourAccessCode) {
      state.your_access_code = yourAccessCode;
    },
    updateTheirAccessCode(state, theirAccessCode) {
      state.their_access_code = theirAccessCode;
    },
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
