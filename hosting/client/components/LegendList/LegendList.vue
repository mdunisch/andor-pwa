<template>
  <div>
    <h4 style="text-align: center;">Zum Starten wähle bitte eine Legende aus:</h4>

    <ui-collapsible
      v-for="legend in legends"
      :key="legend.slug"
      class="no-border"
      :open="open === legend.slug"
      @open="openCollapsible(legend.slug)"
    >
      <div slot="header">{{ legend.name }}</div>
      <p style="white-space: pre-wrap;">{{ legend.abstract }}</p>
      <div style="text-align: right">
        <ui-button @click="changeLegend(legend.slug)">Legende starten</ui-button>
      </div>
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
.no-border >>> .ui-collapsible__body {
  border: none;
}
</style>