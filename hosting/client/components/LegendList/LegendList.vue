<template>
  <div>
    <h3>wähle eine Legende:</h3>
    <ui-menu
      has-secondary-text
      :options="legendsMenu"
      style="max-width: 100%;"
      @select="changeLegend"
    ></ui-menu>
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
    }
  },
  methods: {
    changeLegend(e) {
      this.$router.push(`/${e.slug}`);
    }
  }
};
</script>

<style scoped>
</style>