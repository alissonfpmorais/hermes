const argumentError = require('../../error.js')

const getShape = () => ({
  name: 'label',
  code: 'TF-0003',
  details: ['content', 'type']
})

const fromShape = (content, type) => {
  if (!content || !type) throw argumentError()

  const shape = getShape()
  shape.details = [
    { key: 'content', value: content },
    { key: 'type', value: type },
  ]

  return shape
}

module.exports = { getShape, fromShape }
