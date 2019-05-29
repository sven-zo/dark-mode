const https = require('https')

module.exports = () => {
  let check = false
  const req = https.request(
    {
      hostname: HOSTNAME_URL,
      path: '/',
      method: 'GET'
    },
    res => {
      res.on('data', d => {
        check = d === 'Service is active'
      })
    }
  )
  res.end('deepmoji', check)
}
