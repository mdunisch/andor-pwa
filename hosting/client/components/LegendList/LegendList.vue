<template>
  <div>
    <h4 style="text-align: center;">Zum Starten wähle bitte eine Legende aus:</h4>

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
    openCollapsible(slug) {
      this.open = slug;
    }
  }
};
</script>

<style scoped>
</style>