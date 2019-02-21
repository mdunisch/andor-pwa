<template>
  <div>
    <h3>{{ legendName }}</h3>
    <div style="display: flex;">
      <ui-button
        v-for="card in cards.filter(i => i.type ==='letter')"
        :key="card.name"
        :raised="!card.seen"
        size="large"
        class="cardbtn"
        :type="card.seen ? 'primary': 'secondary'"
        @click="opencard(card.name)"
      >{{ card.name }}</ui-button>
    </div>
    <hr>
    <div style="display: flex;">
      <ui-button
        v-for="card in cards.filter(i => i.type ==='custom')"
        :key="card.name"
        :raised="!card.seen"
        size="large"
        :type="card.seen ? 'primary': 'secondary'"
        class="cardbtn customcard"
        @click="opencard(card.name)"
      >
        <strong>{{ card.name }}</strong>
        <small>{{ card.subname }}</small>
      </ui-button>
    </div>
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
  },
  methods: {
    opencard(name){
      return this.$store.commit('openCard', name);
    }
  }
};
</script>

<style scoped>
.cardbtn {
  margin: 20px;
}

.customcard {
  max-width: 200px;
  height: auto;
  padding: 15px;
}

.customcard >>> .ui-button__content {
  flex-direction: column;
}

.customcard >>> .ui-button__content strong {
  padding-bottom: 20px;
}
</style>