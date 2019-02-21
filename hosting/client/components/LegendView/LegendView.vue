<template>
  <div>
    <h3>{{ legendName }}</h3>
    <ul>
      <li v-for="card in cards.filter(i => i.type ==='letter')" :key="card.name">{{ card.name }}</li>
    </ul>
    <hr>
    <ul>
      <li v-for="card in cards.filter(i => i.type ==='custom')" :key="card.name">{{ card.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    cards() {
      return this.$store.getters.currentLegend.cards;
    },
    legendName() {
      return this.$store.getters.currentLegend.name;
    }
  }
};
</script>

<style scoped>
</style>