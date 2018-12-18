const auth = (conn, path, data) => ({
  method: 'POST',
  url: path,
  data: data
})

const list = (conn, path) => ({
  method: 'GET',
  url: path
})

const create = (conn, path, token, data) => ({
  method: 'POST',
  url: path,
  data: data,
  headers: { 'Authorization': `Bearer ${token}` }
})

const get = (conn, path, id) => ({
  method: 'GET',
  url: `${path}/${id}`
})

const update = (conn, path, token, id, data) => ({
  method: 'PUT',
  url: `${path}/${id}`,
  data: data,
  headers: { 'Authorization': `Bearer ${token}` }
})

const remove = (conn, path, token, id) => ({
  method: 'DELETE',
  url: `${path}/${id}`,
  headers: { 'Authorization': `Bearer ${token}` }
})

module.exports = { auth, list, create, get, update, remove }
