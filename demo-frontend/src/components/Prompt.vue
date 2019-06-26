<template>
  <div class="bg-lightblue w-1/2 mx-auto text-center p-1 rounded-lg">
    <p>Hello. How are you feeling?</p>
    <div class="p-5">
      <input type="text" v-model="message">
      <a
        class="bg-darkblue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer text-lighta hover:bg-green"
        @click="sendSentence(message)"
      >Send</a>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'prompt',
  methods: mapActions(['sendSentence']),
  data() {
    return {
      message: null
    }
  }
}
</script>