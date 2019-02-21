<template>
  <div>legende wurde gewählt {{ legendLinks }}</div>
</template>

<script>
export default {
  computed: {
    legendLinks() {
      const legendSlug = this.$route.params.slug;
      return this.$store.state.legends.find(i => i.slug === legendSlug).cards.map(card => {
          return { slug: card.slug, name: card.name };
      });
    }
  },
  methods: {
  }
};
</script>

<style scoped>
</style>