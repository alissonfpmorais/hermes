const api = require('../../api')
const connection = require('../../connection.js')

// Authenticate user
const authenticate = (conn) => ((email, password) => {
  const path = '/admin/auth'

  // Create request schema
  const request = api.auth(conn, path, { email, password })
  // Execute request
  return conn.execute(conn, request)
})

module.exports = authenticate
