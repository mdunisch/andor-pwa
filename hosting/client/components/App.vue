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