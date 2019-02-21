<template>
  <div>
    <ui-toolbar :title="activeLegend">
      <div slot="icon">
        <ui-icon-button
          v-show="menuVisible"
          color="black"
          icon="arrow_back"
          size="large"
          type="secondary"
          @click="historyBack"
        ></ui-icon-button>
      </div>
    </ui-toolbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  computed: {
    menuVisible() {
      return this.$route.path !== "/";
    },
    activeLegend() {
      const preName = 'Andor Legenden';

      if(!this.$store.getters.currentLegend){
        return preName;
      }
      return preName + ': ' + this.$store.getters.currentLegend.name;
    }
  },
  methods: {
    historyBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
</style>