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
      <div v-if="mainpage" style="width: 35%; padding-top: 5px;">
        <img src="./../asserts/logo-menue.png" alt style="width: 100%">
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
      console.log("click");
      this.$store.dispatch("loadLegenden");
    }
  }
};
</script>

<style scoped>
</style>