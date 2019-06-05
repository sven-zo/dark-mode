const https = require('https')

module.exports = (options, postData) =>
  new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let rawData = ''
      res.setEncoding('utf8')
      res.on('data', d => {
        rawData += d
        console.log(d)
      })
      res.on('end', () => {
        resolve(rawData)
      })
      res.on('error', e => reject(e))
    })
    req.on('error', error => {
      reject(error)
    })
    if (postData) {
      req.write(postData)
    }
    req.end()
  })
