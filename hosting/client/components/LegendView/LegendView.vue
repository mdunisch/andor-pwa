<template>
  <div>
    <div style="display: flex; flex-wrap: wrap;">
      <ui-button
        v-for="card in currentLegend.cards.filter(i => i.type ==='letter')"
        :key="card.name"
        :raised="!card.seen"
        size="large"
        class="cardbtn"
        :class="{ seen: card.seen }"
        @click="handleOpenCard(card.slug)"
      >
        {{ card.name }}
      </ui-button>
    </div>
    <hr v-if="currentLegend.cards.filter(i => i.type ==='custom').length !== 0" class="trenner">
    <div
      v-for="card in currentLegend.cards.filter(i => i.type ==='custom')"
      :key="card.name"
      class="customCardHolder"
    >
      <ui-button
        :raised="!card.seen"
        size="large"
        :type="card.seen ? 'primary': 'secondary'"
        class="cardbtn customcard"
        :class="{ seen: card.seen }"
        @click="handleOpenCard(card.slug)"
      >
        {{ card.name }}
      </ui-button>
      <div style="padding-right: 15px;">{{ card.subname }}</div>
    </div>
    <ui-modal
      v-show="currentCard"
      ref="cardmodal"
      size="fullscreen"
      :title="currentCard.name"
      class="cardModal"
      transition="fade"
      @hide="handleCloseCard"
    >
      <CardPreview :card-data="currentCard || {}" :name="currentLegend.name" card-type="app" />
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
      if(this.currentCard){
        this.$router.go(-1);
      }
    }
  }
};
</script>

<style scoped>
.cardbtn {
  margin: 10px;
  border-radius: 5px;
  background-image: url("./../../asserts/blankocard.png");
  background-size: cover;
  background-position: center;
  font-size: 36px;
  text-shadow: 0px 0px 2px white;

  width: 85px;
  height: 128px;
}

.cardbtn.seen {
  filter: grayscale(90%);
}

.cardbtn.customcard {
  font-size: 15px;
  padding: 0 4rem;
  background-position: bottom;
  border-radius: 0 0 5px 5px;
  height: 100px;
}

.customcard >>> .ui-button__content {
  flex-direction: column;
}

.customcard >>> .ui-button__content strong {
  padding-bottom: 20px;
}

.customCardHolder {
  display: flex;
  align-items: center;
}

.cardModal >>> .ui-modal__body {
  padding: 0;
}

.trenner {
    border-width: 0 0 1px;
    color: #2F4F4F;
    border-image: linear-gradient(90deg, rgba(135, 206, 235, 0),#2F4F4F 50%, rgba(135, 206, 235, 0) 100%) 0 0 100%;
    border-style: solid;
}
</style>