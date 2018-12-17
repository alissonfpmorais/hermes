const checkBox = require('./comp-check-box')
const comboBox = require('./comp-combo-box')
const label = require('./comp-label')
const radioButton = require('./comp-radio-button')
const textArea = require('./comp-text-area')
const textField = require('./comp-text-field')

const components = (conn) => ({
  checkBox,
  comboBox,
  label,
  radioButton,
  textArea,
  textField
})

module.exports = components
