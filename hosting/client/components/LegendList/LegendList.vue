<template>
  <div>
    <h3>wähle eine Legende:</h3>
    <ui-menu
      has-secondary-text
      :options="legendsMenu"
      style="max-width: 100%;"
      @select="changeLegend"
    ></ui-menu>
    <ui-button :loading="loading" @click="handleLoading">Laden</ui-button>
  </div>
</template>

<script>
export default {
  computed: {
    legendsMenu() {
      return this.$store.state.legends.map(legend => {
          return [
            {
              slug: legend.slug,
              label: legend.name,
              secondaryText: legend.slug
            },
            {
              type: "divider"
            }
          ];
        })
        .flat()
        .slice(0, -1);
    },
    loading(){
      return this.$store.state.ui.loading;
    } 
  },
  methods: {
    changeLegend(e) {
      this.$router.push(`/${e.slug}`);
    },
    handleLoading(){
      this.$store.dispatch('loadLegenden');
    }
  }
};
</script>

<style scoped>
</style>