// Dependencies
const { router, get, post, options } = require('microrouter')
// Routes
const index = require('./routes')
const status = require('./routes/status')
const sentence = require('./routes/sentence')
const { login, register } = require('./routes/auth')
const notfound = require('./routes/notfound')

// Router
module.exports = router(
  get('/', index),
  get('/status', status),
  options('/sentence', sentence.options),
  post('/sentence', sentence.post),
  post('/auth/login', login),
  post('/auth/register', register),
  post('/*', notfound),
  get('/*', notfound)
)
