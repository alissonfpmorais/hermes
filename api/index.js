const auth = (conn, path, data) => ({
  method: 'POST',
  url: path,
  data: data
})

const list = (conn, path) => ({
  method: 'GET',
  url: path
})

const create = (conn, path, data) => ({
  method: 'POST',
  url: path,
  data: data,
  headers: { 'Authorization': `Bearer ${conn.params.token}` }
})

const get = (conn, path, id) => ({
  method: 'GET',
  url: `${path}/${id}`
})

const update = (conn, path, id, data) => ({
  method: 'PUT',
  url: `${path}/${id}`,
  data: data,
  headers: { 'Authorization': `Bearer ${conn.params.token}` }
})

const remove = (conn, path, id) => ({
  method: 'DELETE',
  url: `${path}/${id}`,
  headers: { 'Authorization': `Bearer ${conn.params.token}` }
})

module.exports = { list, create, get, update, remove }
