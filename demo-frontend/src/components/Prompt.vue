<template>
  <div v-if="ready">
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
    <br>
    <div v-if="response.suggestions" class="bg-lightb w-1/2 mx-auto text-center p-1 rounded-lg">
      <h1>Full report:</h1>
      <br>
      <div v-if="response.suggestions">
        <div v-if="response.suggestions.angry.length > 0">
          <h2>Angry suggestions</h2>
          <p v-for="type in response.suggestions.angry" :key="type">{{type}}</p>
        </div>
        <div v-if="response.suggestions.bad.length > 0">
          <h2>Bad suggestions</h2>
          <p v-for="type in response.suggestions.bad" :key="type">{{type}}</p>
        </div>
        <div v-if="response.suggestions.disgusted.length > 0">
          <h2>Disgusted suggestions</h2>
          <p v-for="type in response.suggestions.disgusted" :key="type">{{type}}</p>
        </div>
        <div v-if="response.suggestions.fearful.length > 0">
          <h2>Fearful suggestions</h2>
          <p v-for="type in response.suggestions.fearful" :key="type">{{type}}</p>
        </div>
        <div v-if="response.suggestions.happy.length > 0">
          <h2>Happy suggestions</h2>
          <p v-for="type in response.suggestions.happy" :key="type">{{type}}</p>
        </div>
        <div v-if="response.suggestions.sad.length > 0">
          <h2>Sad suggestions</h2>
          <p v-for="type in response.suggestions.sad" :key="type">{{type}}</p>
        </div>
        <div v-if="response.suggestions.surprised.length > 0">
          <h2>Surprised suggestions</h2>
          <p v-for="type in response.suggestions.surprised" :key="type">{{type}}</p>
        </div>
      </div>
      <br>
      <p v-if="Math.abs(response.totalScore) > 0">Total score: {{response.totalScore}}</p>
      <p v-if="Math.abs(response.angerScore) > 0">Anger score: {{response.angerScore}}</p>
      <p v-if="Math.abs(response.sadScore) > 0">Sad score: {{response.sadScore}}</p>
      <p v-if="Math.abs(response.surpriseScore) > 0">Surprise score: {{response.surpriseScore}}</p>
      <p v-if="Math.abs(response.joyScore) > 0">Joy score: {{response.joyScore}}</p>
      <p v-if="Math.abs(response.loveScore) > 0">Love score: {{response.loveScore}}</p>
      <p v-if="Math.abs(response.fearScore) > 0">Fear score: {{response.fearScore}}</p>
      <br>
      <div v-for="emoji in response.emojiData" :key="JSON.stringify(emoji)">
        <h1>{{emoji.emoji}}</h1>
        <p v-if="emoji.prob">Probability: {{emoji.prob}}</p>
        <p v-if="emoji.name">Name: {{emoji.name}}</p>
        <p v-if="emoji.polarity">Polarity: {{emoji.polarity}}</p>
        <p v-if="emoji.types">Types: {{JSON.stringify(emoji.types)}}</p>
        <p v-if="emoji.score">Score: {{emoji.score}}</p>
        <br>
      </div>
    </div>
  </div>
  <div v-else class="bg-lightblue w-1/2 mx-auto rounded-lg p-10">
    <Spinner></Spinner>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import Spinner from './Spinner.vue'

export default {
  name: 'prompt',
  computed: mapState(['ready', 'response']),
  methods: mapActions(['sendSentence']),
  data() {
    return {
      message: null
    }
  },
  components: {
    Spinner
  }
}
</script>