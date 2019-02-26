<template>
  <div>
    <ui-toolbar :title="activeLegend">
      <div slot="icon">
        <ui-icon-button
          v-show="mainpage"
          color="black"
          icon="arrow_back"
          size="large"
          type="secondary"
          @click="historyBack"
        ></ui-icon-button>
      </div>
      <div slot="actions">
        <ui-button v-show="!mainpage" icon="refresh" type="secondary" :loading="loading" @click="handleLoading">aktualisieren</ui-button>
      </div>
    </ui-toolbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  computed: {
    mainpage() {
      return this.$route.path !== "/";
    },
    activeLegend() {
      const preName = "Andor Legenden";

      if (!this.$store.getters.currentLegend) {
        return preName;
      }
      return preName + ": " + this.$store.getters.currentLegend.name;
    },
    loading() {
      return this.$store.state.ui.loading;
    }
  },
  methods: {
    historyBack() {
      this.$router.go(-1);
    },
    handleLoading() {
      this.$store.dispatch("loadLegenden");
    }
  }
};
</script>

<style scoped>
</style>