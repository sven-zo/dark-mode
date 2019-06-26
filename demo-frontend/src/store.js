import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isServerAwake: false,
    isParserAwake: false
  },
  mutations: {
    isServerAwake(state, bool) {
      state.isServerAwake = bool
    },
    isParserAwake(state, bool) {
      state.isParserAwake = bool
    }
  },
  actions: {
    async pingServer({ commit }) {
      const request = await fetch(
        'https://core-sorxop5d4a-uc.a.run.app/status',
        { mode: 'no-cors' }
      )
      const data = await request.json()
      const { deepmoji, core } = data.services
      commit('isServerAwake', core)
      commit('isParserAwake', deepmoji)
    }
  }
})
