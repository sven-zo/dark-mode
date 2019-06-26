// Environment variables
require('dotenv').config()
const { HOSTNAME_URL } = process.env
// Dependencies
const { send, json } = require('micro')
const request = require('../utils/request')
const emotion = require('emoji-emotion')
const {
  emotionTypes,
  emotions_angry,
  emotions_bad,
  emotions_disgusted,
  emotions_fearful,
  emotions_happy,
  emotions_sad,
  emotions_surprised
} = require('../utils/emotionTypes')

// Route
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  try {
    const incoming = await json(req)
    // Validate incoming
    let validationError = true
    if (incoming.sentence && typeof incoming.sentence === 'string') {
      validationError = false
    }
    if (validationError) {
      send(res, 400, 'Bad request')
      return null
    }
    // Send correctly formatted request to neural network
    const formatted = {
      sentences: [incoming.sentence]
    }
    const response = await request(
      {
        hostname: HOSTNAME_URL,
        path: '/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      },
      JSON.stringify(formatted)
    )
    let emojiData = JSON.parse(response)
    // Sort and format the data
    emojiData = emojiData.emoji[0]
    emojiData.sort((a, b) => b.prob - a.prob)
    // Add emotion polarity to emojis
    emojiData = emojiData.map(set => ({
      ...set,
      ...emotion.filter(({ emoji }) => set.emoji === emoji)[0]
    }))
    // Add emotion type to emojis
    emojiData = emojiData.map(set => ({
      ...set,
      types: emotionTypes[set.name]
    }))
    // Score using polarity and probability
    emojiData = emojiData.map(set => ({
      ...set,
      // score: set.prob < 0.001 ? 0 : set.prob * set.polarity
      score: set.prob * set.polarity
    }))
    // Turn null into 0
    emojiData = emojiData.map(set => ({
      ...set,
      score: !set.polarity ? 0 : set.score
    }))
    // Calculate score for the whole sentence
    let angerScore = 0
    let sadScore = 0
    let surpriseScore = 0
    let joyScore = 0
    let loveScore = 0
    let fearScore = 0
    let totalScore = 0
    emojiData.map(({ score, types }) => {
      totalScore += score
      if (types) {
        if (types.includes('anger')) {
          angerScore += score
        }
        if (types.includes('sad')) {
          sadScore += score
        }
        if (types.includes('surprise')) {
          surpriseScore += score
        }
        if (types.includes('joy')) {
          joyScore += score
        }
        if (types.includes('love')) {
          loveScore += score
        }
        if (types.includes('fear')) {
          fearScore += score
        }
      }
    })
    // Create suggestions based on common emotion words
    let suggestions = {}
    suggestions.angry = emotions_angry.filter(w =>
      new RegExp(w, 'i').test(incoming.sentence)
    )
    suggestions.bad = emotions_bad.filter(w =>
      new RegExp(w, 'i').test(incoming.sentence)
    )
    suggestions.disgusted = emotions_disgusted.filter(w =>
      new RegExp(w, 'i').test(incoming.sentence)
    )
    suggestions.fearful = emotions_fearful.filter(w =>
      new RegExp(w, 'i').test(incoming.sentence)
    )
    suggestions.happy = emotions_happy.filter(w =>
      new RegExp(w, 'i').test(incoming.sentence)
    )
    suggestions.sad = emotions_sad.filter(w =>
      new RegExp(w, 'i').test(incoming.sentence)
    )
    suggestions.surprised = emotions_surprised.filter(w =>
      new RegExp(w, 'i').test(incoming.sentence)
    )
    if (!suggestions.angry) {
      suggestions.angry = undefined
    }
    if (!suggestions.bad) {
      suggestions.bad = undefined
    }
    if (!suggestions.disgusted) {
      suggestions.disgusted = undefined
    }
    if (!suggestions.fearful) {
      suggestions.fearful = undefined
    }
    if (!suggestions.happy) {
      suggestions.happy = undefined
    }
    if (!suggestions.sad) {
      suggestions.sad = undefined
    }
    if (!suggestions.surprised) {
      suggestions.surprised = undefined
    }
    // Send response
    send(res, 200, {
      suggestions,
      totalScore,
      angerScore,
      sadScore,
      surpriseScore,
      joyScore,
      loveScore,
      fearScore,
      emojiData
    })
  } catch (err) {
    throw err
    // send(res, 500, err)
  }
}
