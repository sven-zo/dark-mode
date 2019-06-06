// Dependencies
const { router, get } = require('microrouter')
// Routes
const index = require('./routes')
const status = require('./routes/status')
const notfound = require('./routes/notfound')

// Router
module.exports = router(
  get('/', index),
  get('/status', status),
  get('/*', notfound)
)
