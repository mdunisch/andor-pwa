<template>
  <div>
    <div style="display: flex;">
      <ui-button
        v-for="card in currentLegend.cards.filter(i => i.type ==='letter')"
        :key="card.name"
        :raised="!card.seen"
        size="large"
        class="cardbtn"
        v-bind:class="{ seen: card.seen }"
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
        v-bind:class="{ seen: card.seen }"
        @click="handleOpenCard(card.slug)"
      >
        <strong>{{ card.name }}</strong>
        <small>{{ card.subname }}</small>
      </ui-button>
    </div>
    <ui-modal
      ref="cardmodal"
      size="fullscreen"
      :title="currentCard.name"
      class="cardModal"
      transition="fade"
      @hide="handleCloseCard"
    >
      <CardPreview :card-data="currentCard || {}" :name="currentLegend.name" card-type="app"/>
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
    currentCard() {
      return this.$store.getters.currentCard;
    }
  },
  mounted() {
    // Open on direct route
    if (
      this.currentCard &&
      !document.querySelector("body").classList.contains("ui-modal--is-open")
    ) {
      this.$refs["cardmodal"].open();
    }
  },
  methods: {
    handleOpenCard(slug) {
      this.$router.push(`/${this.$route.params.legendSlug}/${slug}`);
      this.$refs["cardmodal"].open();
      this.$store.commit("seeCard");
    },
    handleCloseCard() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.cardbtn {
  margin: 10px;
  border-radius: 5px;
  height: 128px;
  width: 85px;
  background-image: url("./../../asserts/blankocard.png");
  background-size: cover;
  font-size: 32px;
  text-shadow: 0px 0px 2px white;
}

.cardbtn.seen {
  filter: grayscale(90%);
}

.cardbtn.customcard {
      width: auto;
    background: navajowhite;
  max-width: 200px;
  height: auto;
  padding: 15px;
  font-size: 15px;
}

.customcard >>> .ui-button__content {
  flex-direction: column;
}

.customcard >>> .ui-button__content strong {
  padding-bottom: 20px;
}

.cardModal >>> .ui-modal__body {
  padding: 0;
}
</style>