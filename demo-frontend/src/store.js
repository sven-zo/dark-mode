import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const API = 'https://core-sorxop5d4a-uc.a.run.app'
// const API = 'http://localhost:5432'

export default new Vuex.Store({
  state: {
    isServerAwake: false,
    isParserAwake: false,
    parserWaitTime: 0,
    response: {},
    ready: true
  },
  mutations: {
    isServerAwake(state, bool) {
      state.isServerAwake = bool
    },
    isParserAwake(state, bool) {
      state.isParserAwake = bool
    },
    increment(state) {
      state.parserWaitTime++
    },
    response(state, object) {
      state.response = object
    },
    ready(state, bool) {
      state.ready = bool
    }
  },
  actions: {
    async pingServer({ commit }) {
      const request = await fetch(API + '/status')
      const data = await request.json()
      let { deepmoji, core } = data.services
      commit('isServerAwake', core)
      commit('isParserAwake', deepmoji)
      let allowInterval = !deepmoji
      let intervalIds = []
      if (allowInterval) {
        intervalIds[0] = setInterval(() => {
          commit('increment')
        }, 1000)
        intervalIds[1] = setInterval(async () => {
          const request = await fetch(API + '/status')
          const data = await request.json()
          deepmoji = data.services.deepmoji
          commit('isParserAwake', deepmoji)
          allowInterval = !deepmoji
        }, 6000)
      } else {
        clearInterval(intervalIds[0])
        clearInterval(intervalIds[1])
      }
    },
    async sendSentence({ commit }, message) {
      commit('ready', false)
      const request = await fetch(API + '/sentence', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sentence: message })
      })
      const data = await request.json()
      commit('response', data)
      commit('ready', true)
    }
  }
})
