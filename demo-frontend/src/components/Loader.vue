<template>
  <div v-if="isParserAwake" class="bg-lightblue w-1/2 mx-auto text-center p-1 rounded-lg">
    <h1>dark mode is ready!</h1>
    <br>
    <Spinner></Spinner>
    <br>
    <p>just a second</p>
  </div>
  <div v-else-if="isServerAwake" class="bg-lightblue w-1/2 mx-auto text-center p-1 rounded-lg">
    <h1>dark mode is getting ready...</h1>
    <br>
    <Spinner></Spinner>
    <br>
    <p>this could take up to three minutes ({{parserWaitTime}})</p>
  </div>
  <div v-else class="bg-lightblue w-1/2 mx-auto text-center p-1 rounded-lg">
    <h1>contacting the dark mode service...</h1>
    <br>
    <Spinner></Spinner>
    <br>
    <p>this should not take too long</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Spinner from './Spinner.vue'

export default {
  name: 'loader',
  computed: mapState(['isServerAwake', 'isParserAwake', 'parserWaitTime']),
  components: {
    Spinner
  }
}
</script>