import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/**
 * Loading Legends from Fetch-Request (prod) or local file (dev)
 * @returns {Promise.<Object>}
 */
const loadLegends = async() => {

  // Dev
  if (process.env.NODE_ENV === 'development') {
    const json = require('./../../storage/legends.json');
    return json;
  }

  const response = await fetch("https://firebasestorage.googleapis.com/v0/b/andor-pwa.appspot.com/o/legends.json?alt=media&token=917ca054-8329-4075-95ce-c911771df6e7")
  if (!response.ok){
    throw new Error(response.status);
  } 
  return response.json();
}


export default new Vuex.Store({
  //strict: true,
  state: {
    ui: {
      loading: false
    },
    legends: []
  },
  mutations: {
    loading: (state, newState) => state.ui.loading = newState,
    applyLoadedLegends(state, legends){

      // Adding seen: false to every card
      state.legends = legends.map(legend => {
        legend.cards = legend.cards.map(card => {
          return {...card, seen: false };
        })
        return legend;
      });
    }
  },
  getters: {
    currentLegend(state){
      return state.legends.find(i => i.slug === state.route.params.legendSlug) || false;
    },
    currentCard(state, getters){
      return getters.currentLegend && getters.currentLegend.cards.find(i => i.slug === state.route.params.cardSlug) || false;
    }
  },
  actions: {
    async loadLegenden({ commit }){
      commit('loading', true);
      try {
        commit('applyLoadedLegends', await loadLegends());
        commit('loading', false);
      } catch(e){
        console.error(e); // eslint-disable-line no-console
        commit('loading', false);
      }
    }
  }
});