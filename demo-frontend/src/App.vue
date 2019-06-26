<template>
  <div id="app" class="h-screen w-screen bg-cover bg-darkblue font-mono">
    <div class="w-1/2 mx-auto py-10">
      <dark-mode-icon></dark-mode-icon>
    </div>
    <loader></loader>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import DarkModeIcon from './components/DarkModeIcon.vue'
import Loader from './components/Loader.vue'

export default {
  name: 'app',
  computed: mapState(['isServerAwake', 'isParserAwake']),
  methods: mapActions(['pingServer']),
  mounted() {
    this.pingServer()
  },
  components: {
    DarkModeIcon,
    Loader
  }
}
</script>

<style>
@import 'assets/styles/tailwind.postcss';
@import url('https://fonts.googleapis.com/css?family=Space+Mono&display=swap');

#app {
  background-image: url('/img/star-bg.jpg');
}
</style>
