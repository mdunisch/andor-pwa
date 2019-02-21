import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  //strict: true,
  state: {
    legends: [
     {
        name: 'Die dunklen weiten von Andor',
        slug: 'die-dunklen-weiten-von-andor',
        cards: [
          {
            type: 'letter',
            name: 'A1',
            slug: 'a1',
            seen: false,
            text: 'Führt zuerst die Anweisungen auf der **Checkliste** aus.\n\nAnschließend legt ihr zusätzlich folgenden Material neben dem Spielplan bereit:\n* Legt die Hexte, die 15 Kreaturplättchen, den Gegenstand Gibt und 3 schwarze Würfel bereit.\n* Legen **Sternchen auf D, H und N** der Legendenleiste.\n\n*In Andor trug ist eine Geschichte zu, die Ging so:....*\n\nStellt alle Helden auf das Feld **57.**\n\n***\n**Aufgabe:**\nDie Helden müssen die Burg verteidigen und den **die Dunkelheit** daran hindern, alle Bauern zu verschlingen bevor der Erzähler den Buchstaben **Feld H** erreicht hat.\n***',
          },
          {
            type: 'letter',
            name: 'A2',
            slug: 'a2',
            seen: false,
            text: 'Jetzt gehts los!',
          },
          {
            type: 'custom',
            name: 'In der Dunkelheit',
            slug: 'in-der-dunkelheit',
            seen: false,
            subname: 'Diese Karte wird aufgedeckt, sobald die Dunkelheit in der Burg ist',
            text: '*Nach dem Sieg über den Drachen Tarok ist es Varkur gelungen, ein Drachenei in seinen Besitz zu bringen. Einen zweiten Drachen würde Andor nicht überleben, doch glücklicherweise konnten die Helden das Drachenei stehlen. Doch die eigentliche Aufgabe fängt gerade erst an: Um das Drachenei zu zerstören, müssen die Helden mehr altes Wissen über die Drachen zusammentragen und gleichzeitig den Bewohnern Andors helfen, sich von Taroks Angriff zu erholen.*\n\n***\n**Legendenziel:**\nAlle Feld um die Brug (Feld 22, 34, 45, 34 und 33) müssen von der Dunkelheit befreit sein.\n***\n**Wichtig:** Für jeden Feld, das ein Held die Dunkelheit bekämpft, muss der Held Willenspunkte abgeben:\nbei **2** Spielern **pro Feld 2 Willenspunkte**\nbei **3** Spielern **pro Feld 3 Willenspunkte**\nbei **4** Spielern **pro Feld 4 Willenspunkte**\n ist es Varkur gelungen, ein Drachenei in seinen Besitz zu bringen. Einen zweiten Drachen würde Andor nicht überleben, doch glücklicherweise konnten die Helden das Drachenei stehlen. Doch die eigentliche Aufgabe fängt gerade erst an: Um das Drachenei zu zerstören, müssen die Helden mehr altes Wissen über die Drachen zusammentragen und gleichzeitig den Bewohnern Andors helfen, sich von Taroks Angriff zu erholen.*\n\n***\n**Legendenziel:**\nAlle Feld um die Brug (Feld 22, 34, 45, 34 und 33) müssen von der Dunkelheit befreit sein.\n***\n**Wichtig:** Für jeden Feld, das ein Held die Dunkelheit bekämpft, muss der Held Willenspunkte abgeben:\nbei **2** Spielern **pro Feld 2 Willenspunkte**\nbei **3** Spielern **pro Feld 3 Willenspunkte**\nbei **4** Spielern **pro Feld 4 Willenspunkte**\n',
          }
        ]
     },
      {
         name: 'Blubblubbul',
         slug: 'Bi-Ba-blub',
         cards: []
      }
    ]
  },
  mutations: {
  },
  getters: {
    currentLegend: state => {
      return state.legends.find(i => i.slug === state.route.params.legendSlug) || false;
    },
    currentCard: (state, getters) => {
      return getters.currentLegend && getters.currentLegend.cards.find(i => i.slug === state.route.params.cardSlug) || false;
    }
  }
});