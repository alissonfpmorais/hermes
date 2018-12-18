const api = require('../../api')
const connection = require('../../connection.js')

const authenticate = (conn) => ((email, password) => {
  const path = '/admin/auth'
  const request = api.auth(conn, path, { email, password })
  return conn.execute(conn, request)
})

module.exports = authenticate
