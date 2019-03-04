<template>
  <div>
    <ui-toolbar title="dasd">
      <div slot="icon">
        <ui-icon-button
          v-show="!mainpage"
          color="black"
          icon="arrow_back"
          size="large"
          type="secondary"
          @click="historyBack"
        ></ui-icon-button>
      </div>
      <div slot="actions">
        <ui-icon-button
          v-show="mainpage"
          color="black"
          icon="refresh"
          :loading="loading"
          size="large"
          type="secondary"
          @click="handleLoading"
        ></ui-icon-button>
      </div>
      <div v-if="mainpage" style="height: 3.5rem; padding: 3px; margin-left: -10px;">
        <img src="./../asserts/logo-menue.png" alt style="max-height: 100%">
      </div>
      <div v-if="!mainpage">{{ activeLegend }}</div>
    </ui-toolbar>
    <ui-alert v-show="message" @dismiss="dismissMessage">
      <span v-html="message"></span>
    </ui-alert>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  computed: {
    mainpage() {
      return this.$route.path === "/";
    },
    activeLegend() {
      return this.$store.getters.currentLegend.name;
    },
    loading() {
      return this.$store.state.ui.loading;
    },
    message() {
      return this.$store.state.ui.message;
    }
  },
  mounted() {
    document.querySelector('body').addEventListener('AppUpdate', () => {
      this.$store.commit('showMessage', 'Neue Version der App verfügbar! <a href="javascript:window.location.reload(true)">Jetzt aktualisieren</a>');
    });
  },
  methods: {
    historyBack() {
      this.$router.go(-1);
    },
    handleLoading() {
      this.$store.dispatch("loadLegenden");
    },
    dismissMessage() {
      this.$store.commit("clearMessage");
    }
  }
};
</script>

<style scoped>
</style>