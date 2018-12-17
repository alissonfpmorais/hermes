const model = require('./model.js')
const actual = require('./actual.js')

const forms = (conn) => {
  const modelPath = '/model/form'
  const actualPath = '/actual/form'

  return {
    model: model(conn, modelPath),
    actual: actual(conn, actualPath)
  }
}

module.exports = forms
