const argumentError = (message) => ({
  name: 'ArgumentError',
  message: message !== undefined ? message : 'One or more arguments are invalid!'
})

module.exports = argumentError
