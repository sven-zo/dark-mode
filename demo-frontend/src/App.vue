<template>
  <div id="app" class="h-screen w-screen bg-cover bg-darkblue font-mono">
    <div class="w-1/2 mx-auto py-10">
      <dark-mode-icon></dark-mode-icon>
    </div>
    <loader v-if="!isServerAwake || !isParserAwake"></loader>
    <prompt v-else></prompt>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import DarkModeIcon from './components/DarkModeIcon.vue'
import Loader from './components/Loader.vue'
import Prompt from './components/Prompt.vue'

export default {
  name: 'app',
  computed: mapState(['isServerAwake', 'isParserAwake']),
  methods: mapActions(['pingServer']),
  mounted() {
    this.pingServer()
  },
  components: {
    DarkModeIcon,
    Loader,
    Prompt
  }
}
</script>

<style>
@import 'assets/styles/tailwind.postcss';
@import url('https://fonts.googleapis.com/css?family=Space+Mono&display=swap');

#app {
  background-image: url('/img/star-bg.jpg');
}

body {
  background-color: #1e4d6b;
}

h1 {
  font-size: 1.2rem;
}

h2 {
  font-size: 1rem;
  font-weight: 600;
}
</style>
