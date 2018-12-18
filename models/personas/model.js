const argumentError = require('../../error.js')
const api = require('../../api')

const getShape = () => ({
  name: 'name',
  attributes: ['name', 'code', 'details']
})

const fromShape = (name, attributes) => {
  if (!name || !attributes) throw argumentError()

  const shape = getShape()
  shape.name = name
  shape.attributes = attributes

  return shape
}

const list = (conn, path) => (() => {
  const request = api.list(conn, path)
  return conn.execute(conn, request)
})

const create = (conn, path) => ((token, name, attributes) => {
  const data = fromShape(name, attributes)
  const request = api.create(conn, path, token, data)
  return conn.execute(conn, request)
})

const get = (conn, path) => ((id) => {
  const request = api.get(conn, path, id)
  return conn.execute(conn, request)
})

const update = (conn, path) => ((token, id, name, attributes) => {
  const data = fromShape(name, attributes)
  const request = api.update(conn, path, token, id, data)
  return conn.execute(conn, request)
})

const remove = (conn, path) => ((id) => {
  const request = api.get(conn, path, token, id)
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
