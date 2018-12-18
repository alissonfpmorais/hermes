const argumentError = require('../../error.js')
const api = require('../../api')

const getShape = () => ({
  name: 'name',
  email: 'email',
  password: 'password',
  photo: 'photo',
  level: 'level',
  persona: ['name', 'attributes']
})

const fromShape = (name, email, password, photo, level, persona) => {
  if (!name || !email || !password || !photo || !level || !persona) throw argumentError()

  const shape = getShape()
  shape.name = name
  shape.email = email
  shape.password = password
  shape.photo = photo
  shape.level = level
  shape.persona = persona

  return shape
}

const list = (conn, path) => (() => {
  const request = api.list(conn, path)
  return conn.execute(conn, request)
})

const create = (conn, path) => ((token, name, email, password, photo, level, persona) => {
  const data = fromShape(name, email, password, photo, level, persona)
  const request = api.create(conn, path, token, data)
  return conn.execute(conn, request)
})

const get = (conn, path) => ((id) => {
  const request = api.get(conn, path, id)
  return conn.execute(conn, request)
})

const update = (conn, path) => ((token, id, name, email, password, photo, level, persona) => {
  const data = fromShape(name, email, password, photo, level, persona)
  const request = api.update(conn, path, token, id, data)
  return conn.execute(conn, request)
})

const remove = (conn, path) => ((token, id) => {
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
