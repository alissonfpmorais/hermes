const axios = require('axios')

// Format Axios response
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

// Create an object connection with all required params
const create = (params) => ({
  baseUrl: params.url,
  http: axios.create({ baseURL: params.url }),
  execute: execute,
  error: { hasError: false, type: '', message: '' },
  params: {}
})

// Check if object connection is valid
const isValid = (conn) => conn.error.hasError

// Add an error to object connection
const assignError = (conn, type, message) => {
  conn = JSON.parse(JSON.stringify(conn))
  conn.error = { hasError: true, type: type, message: message }
  return conn
}

// Add a new parameter to object connection
const assignParams = (conn, key, value) => {
  conn = JSON.parse(JSON.stringify(conn))
  conn.params[key] = value
  return conn
}

module.exports = { execute, create, isValid, assignError, assignParams }
