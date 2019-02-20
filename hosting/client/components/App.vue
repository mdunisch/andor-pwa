<template>
  <div>
    <ui-toolbar title="Inbox">
      <div slot="actions">
        <ui-icon-button color="black" icon="refresh" size="large" type="secondary"></ui-icon-button>

        <ui-icon-button color="black" icon="search" size="large" type="secondary"></ui-icon-button>

        <ui-icon-button
          color="black"
          has-dropdown
          icon="more_vert"
          ref="dropdownButton1"
          size="large"
          type="secondary"
        >
          <ui-menu
            contain-focus
            has-icons
            slot="dropdown"
            :options="menuOptions"
            @close="$refs.dropdownButton1.closeDropdown()"
          ></ui-menu>
        </ui-icon-button>
      </div>
    </ui-toolbar>
  </div>
</template>

<script>
export default {
  methods: {
    openGoogleForms() {
      window.open("https://goo.gl/forms/834NVBDKokUASJeq1");
    },
    handleNewCard() {
      this.$store.commit("addCard");
    }
  }
};
</script>

<style scoped>
.fullHeight {
  height: 100%;
}
.main {
  background-color: #f8f8f8;
}
.footer {
  display: flex;
  align-items: center;
}

.footer_border {
  border-top: 1px solid rgba(128, 128, 128, 0.3);
}

.footer small {
  font-size: 12px;
  margin-right: 20px;
}
</style>