<template>
  <div>
    legende wurde gewählt {{ choosen }}
  </div>
</template>

<script>
export default {
  computed: {
      choosen(){
        return this.$route.params.slug;  
      },
    legendsMenu() {
      return this.$store.state.legends.map(legend => {
          return [
            {
              slug: legend.slug,
              label: legend.name,
              secondaryText: "Ctrl+E"
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
    changeLegend() {
      this.$router.push('home');
    }
  }
};
</script>

<style scoped>
</style>