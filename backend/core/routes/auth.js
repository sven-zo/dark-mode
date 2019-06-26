// Environment variables
require('dotenv').config()
const { PRIVATE_KEY } = process.env
// Dependencies
const { send } = require('micro')
const { Firestore } = require('@google-cloud/firestore')
const jwt = require('jsonwebtoken')

// Database
const db = new Firestore()

// Routes
const login = (_req, res) => {
  send(res, 200, 'login route')
}

const register = async (_req, res) => {
  try {
    const query = db.collection('devices')
    const data = await query.get()
    let devices = []
    data.forEach(device => devices.push(device))
    send(res, 200, devices)
    // const token = jwt.sign({ id: '123' }, PRIVATE_KEY, { expiresIn: '7d' })
    // send(res, 200, token)
  } catch (err) {
    throw err
    send(res, 500, err)
  }
}

module.exports = { login, register }
