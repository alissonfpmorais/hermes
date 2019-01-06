const argumentError = require('./error.js')
const connection = require('./connection.js')
const authenticate = require('./models/auth')
const components = require('./models/components')
const flows = require('./models/flows')
const forms = require('./models/forms')
const personas = require('./models/personas')

// Check if all params sent by user are valid
const validateParams = (params) => {
  if (params.url !== undefined) return params
  else throw argumentError()
}

// Do URL formatting
const formatUrl = (params) => params

// Create a new client
const createClient = (params) => {
  const conn = connection.create(formatUrl(validateParams(params)))

  const client = {
    authenticate: authenticate(conn),
    // components: components(conn),
    flows: flows(conn),
    forms: forms(conn),
    personas: personas(conn)
  }

  return client
}

module.exports = function (params) {
  return createClient(params)
}
