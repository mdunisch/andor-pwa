<template>
  <div>
    <h3>{{ currentLegend.name }}</h3>
    <div style="display: flex;">
      <ui-button
        v-for="card in currentLegend.cards.filter(i => i.type ==='letter')"
        :key="card.name"
        :raised="!card.seen"
        size="large"
        class="cardbtn"
        :type="card.seen ? 'primary': 'secondary'"
        @click="handleOpenCard(card.slug)"
      >{{ card.name }}</ui-button>
    </div>
    <hr v-if="currentLegend.cards.filter(i => i.type ==='custom').length !== 0">
    <div style="display: flex;">
      <ui-button
        v-for="card in currentLegend.cards.filter(i => i.type ==='custom')"
        :key="card.name"
        :raised="!card.seen"
        size="large"
        :type="card.seen ? 'primary': 'secondary'"
        class="cardbtn customcard"
        @click="handleOpenCard(card.slug)"
      >
        <strong>{{ card.name }}</strong>
        <small>{{ card.subname }}</small>
      </ui-button>
    </div>
    <ui-modal
      ref="cardmodal"
      size="fullscreen"
      :title="openCard"
      transition="scale-up"
      @hide="handleCloseCard"
    >
        <CardPreview :card-data="currentLegend.cards.find(i => i.name === openCard) || {}" :name="currentLegend.name" style="margin: 0 auto;" />
    </ui-modal>
  </div>
</template>

<script>
import CardPreview from "andor-legendenkarte";

export default {
  components: { CardPreview },
  computed: {
    currentLegend() {
      return this.$store.getters.currentLegend;
    },
    openCard() {
      return this.$store.state.ui.openCard;
    }
  },
  methods: {
    handleOpenCard(slug) {
      this.$router.push(`/legends/${this.$route.params.legendSlug}/${slug}`);
      this.$refs["cardmodal"].open();
    },
    handleCloseCard() {
      // Todo: Path ändern
      this.$store.commit("closeCard");
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