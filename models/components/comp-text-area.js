const argumentError = require('../../error.js')

const getShape = () => ({
  name: 'text-area',
  code: 'TF-0002',
  details: ['title', 'placeholder', 'type', 'value']
})

const fromShape = (title, placeholder, type, value) => {
  if (!title || !placeholder || !type || !value) throw argumentError()

  const shape = getShape()
  shape.details = [
    { key: 'title', value: title },
    { key: 'placeholder', value: placeholder },
    { key: 'type', value: type },
    { key: 'value', value: value },
  ]

  return shape
}

module.exports = { getShape, fromShape }
