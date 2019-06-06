// Dependencies
const { send } = require('micro')

// Route
module.exports = (_req, res) => {
  send(res, 200, 'Service is active')
}
