// Environment variables
require('dotenv').config()
const { HOSTNAME_URL } = process.env
// Dependencies
const { send } = require('micro')
const request = require('../utils/request')

// Route
module.exports = async (_req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  let didTimeout = false
  let check = false
  try {
    const timer = setTimeout(() => {
      didTimeout = true
      send(res, 200, { services: { deepmoji: false, core: true } })
    }, 5000)
    const reponse = await request({
      hostname: HOSTNAME_URL,
      path: '/',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    clearTimeout(timer)
    check = reponse === 'Service is active'
    if (!didTimeout) {
      send(res, 200, { services: { deepmoji: check, core: true } })
    }
  } catch (err) {
    send(res, 500, { error: err })
  }
}
