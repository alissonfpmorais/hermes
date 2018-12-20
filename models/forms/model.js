const argumentError = require('../../error.js')
const api = require('../../api')
const compFormBuilder = require('../components/comp-form-builder')

const getShape = () => ({
  name: 'name',
  fields: ['name', 'code', 'details']
})

const fromShape = (name, fields) => {
  if (!name || !fields) throw argumentError()

  const shape = getShape()
  shape.name = name
  shape.fields = fields

  return shape
}

const list = (conn, path) => (() => {
  const request = api.list(conn, path)
  return conn
    .execute(conn, request)
    .then(response => {
      response.data = response.data.map(r => compFormBuilder.parseFromForm(r))
      return response
    })
})

const create = (conn, path) => ((token, formBuilder) => {
  const data = compFormBuilder.parseToForm(formBuilder)
  const request = api.create(conn, path, token, data)
  return conn
    .execute(conn, request)
    .then(response => {
      response.data = compFormBuilder.parseFromForm(response.data)
      return response
    })
})

const get = (conn, path) => ((id) => {
  const request = api.get(conn, path, id)
  return conn
    .execute(conn, request)
    .then(response => {
      response.data = compFormBuilder.parseFromForm(response.data)
      return response
    })
})

const update = (conn, path) => ((token, id, formBuilder) => {
  const data = compFormBuilder.parseToForm(formBuilder)
  const request = api.update(conn, path, token, id, data)
  return conn
    .execute(conn, request)
})

const remove = (conn, path) => ((token, id) => {
  const request = api.remove(conn, path, token, id)
  return conn.execute(conn, request)
})

const model = (conn, path) => ({
  list: list(conn, path),
  create: create(conn, path),
  get: get(conn, path),
  update: update(conn, path),
  remove: remove(conn, path)
})

module.exports = model
