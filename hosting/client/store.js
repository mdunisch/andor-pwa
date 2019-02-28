import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

/**
 * Loading Legends from Fetch-Request (prod) or local file (dev)
 * @returns {Promise.<Object>}
 */
const loadLegends = async () => {

  // Dev
  if (process.env.NODE_ENV === 'development') {
    const json = require('./../../storage/legends.json');
    // Simulate Loading
    await new Promise(resolve => setTimeout(resolve, 400));
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
      loading: false,
      error: false
    },
    legends: []
  },
  mutations: {
    loading: (state, newState) => state.ui.loading = newState,
    seeCard(){
      this.getters.currentCard.seen = true;
    },
    applyLoadedLegends(state, legends){

      // Adding seen: false to every card
      state.legends = legends.map(legend => {
        legend.cards = legend.cards.map(card => {
          return {...card, seen: false };
        })
        return legend;
      });
    },
    showError(state, errormsg){
      state.ui.error = errormsg;
    },
    clearError: state => state.ui.error = false
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
        commit('loading', false);
        commit('showError', 'Fehler beim laden der Legenden (Kein Internet?)');
        console.error(e); // eslint-disable-line no-console
      }
    }
  },
  plugins: [createPersistedState()]
});