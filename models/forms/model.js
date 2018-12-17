const argumentError = require('../../error.js')
const api = require('../../api')

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
  return conn.execute(conn, request)
})

const create = (conn, path) => (() => {
  const data = fromShape(name, fields)
  const request = api.create(conn, path, data)
  return conn.execute(conn, request)
})

const get = (conn, path) => ((id) => {
  const request = api.get(conn, path, id)
  return conn.execute(conn, request)
})

const update = (conn, path) => ((id, name, fields) => {
  const data = fromShape(name, fields)
  const request = api.update(conn, path, id, data)
  return conn.execute(conn, request)
})

const remove = (conn, path) => ((id) => {
  const request = api.get(conn, path, id)
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
