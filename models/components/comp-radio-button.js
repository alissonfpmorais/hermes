const argumentError = require('../../error.js')

const getShape = () => ({
  name: 'radio-button',
  code: 'SL-0003',
  details: ['title', 'count', 'content', 'type', 'value']
})

const fromShape = (title, count, content, type, value) => {
  if (!title || !count || !content || !type || !value) throw argumentError()

  const shape = getShape()
  shape.details = [
    { key: 'title', value: title },
    { key: 'count', value: count },
    { key: 'content', value: content },
    { key: 'type', value: type },
    { key: 'value', value: value },
  ]

  return shape
}

module.exports = { getShape, fromShape }
