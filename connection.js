const axios = require('axios')

const execute = (conn, request) => {
  return conn
    .http(request)
    .then(response => ({
      headers: response.headers,
      status: response.status,
      data: response.data
    }))
    .catch(error => ({
      headers: error.response.headers,
      status: error.response.status,
      data: error.response.data
    }))
}

const create = (params) => ({
  baseUrl: params.url,
  http: axios.create({ baseURL: params.url }),
  execute: execute,
  error: { hasError: false, type: '', message: '' },
  params: {}
})

const isValid = (conn) => conn.error.hasError

const assignError = (conn, type, message) => {
  conn = JSON.parse(JSON.stringify(conn))
  conn.error = { hasError: true, type: type, message: message }
  return conn
}

const assignParams = (conn, key, value) => {
  conn = JSON.parse(JSON.stringify(conn))
  conn.params[key] = value
  return conn
}

module.exports = { execute, create, isValid, assignError, assignParams }
