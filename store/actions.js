export default {
  events (context, events) {
    context.commit('EVENTS', events)
  },
  mainMenu (context, mainMenu) {
    context.commit('MAIN_MENU', mainMenu)
  },
  mainMenuOpen (context, mainMenuOpen) {
    context.commit('MAIN_MENU_OPEN', mainMenuOpen)
  }
}
