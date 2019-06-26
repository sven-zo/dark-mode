<template>
  <div id="app" class="h-screen w-screen bg-cover">
    <dark-mode-icon></dark-mode-icon>
  </div>
</template>

<script>
import DarkModeIcon from './components/DarkModeIcon.vue'

export default {
  name: 'app',
  components: {
    DarkModeIcon
  }
}
</script>

<style>
@import 'assets/styles/tailwind.postcss';

#app {
  background-image: url('/img/star-bg.jpg');
}
</style>
