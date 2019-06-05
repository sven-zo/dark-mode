require('dotenv').config()
const request = require('./request')
const { HOSTNAME_URL } = process.env

module.exports = async (_req, res) => {
  let check = false
  try {
    const d = await request({
      hostname: HOSTNAME_URL,
      path: '/',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    check = d === 'Service is active'
    res.end(`deepmoji==${check}`)
  } catch (err) {
    res.end(err)
  }
}
