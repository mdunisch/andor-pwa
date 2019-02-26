<template>
  <div>
    <h3>wähle eine Legende:</h3>

    <ui-collapsible
      v-for="legend in legends"
      :key="legend.slug"
      :open="open === legend.slug"
      @open="openCollapsible(legend.slug)"
    >
      <div slot="header">{{ legend.name }}</div>
      <p>{{ legend.abstract }}</p>
      <ui-button @click="changeLegend(legend.slug)">Legende starten</ui-button>
    </ui-collapsible>
    <ui-button :loading="loading" @click="handleLoading">Laden</ui-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false
    };
  },
  computed: {
    loading() {
      return this.$store.state.ui.loading;
    },
    legends() {
      return this.$store.state.legends;
    }
  },
  methods: {
    changeLegend(slug) {
      this.$router.push(`/${slug}`);
    },
    handleLoading() {
      this.$store.dispatch("loadLegenden");
    },
    openCollapsible(slug) {
      this.open = slug;
    }
  }
};
</script>

<style scoped>
</style>