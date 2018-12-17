const model = require('./model.js')
const actual = require('./actual.js')

const personas = (conn) => {
  const modelPath = '/model/persona'
  const actualPath = '/actual/persona'

  return {
    model: model(conn, modelPath),
    actual: actual(conn, actualPath)
  }
}

module.exports = personas
