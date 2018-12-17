const api = require('../../api')

const authenticate = (conn) => ((email, password) => {
  const path = '/admin/auth'
  const request = api.auth(conn, path, { email, password })
  return conn.http(request)
})

module.exports = authenticate
