const argumentError = require('./error.js')
const connection = require('./connection.js')
const authenticate = require('./models/auth')
const components = require('./models/components')
const flows = require('./models/flows')
const forms = require('./models/forms')
const personas = require('./models/personas')

const validateParams = (params) => {
  if (params.url !== undefined) return params
  else throw argumentError()
}

const formatUrl = (params) => params

const createClient = (params) => {
  const conn = connection.create(formatUrl(validateParams(params)))

  const client = {
    authenticate: authenticate(conn),
    // components: components(conn),
    flows: flows(conn),
    forms: forms(conn),
    personas: personas(conn)
  }

  return client
}

// function start(params) {
//   return createClient(params)
// }

// function call(hermes) {
//   formBuilder = { "title": "Formulário Padrão", "data": { "sections": [ { "name": "section_188114", "label": "Seção 1", "clientKey": "section_188114", "order": 0, "rows": [ { "name": "section_188114_row_82107", "label": "", "order": 0, "controls": [ { "type": "text", "name": "control_text_701290", "fieldName": "control_text_701290", "label": "Nome", "order": 0, "defaultValue": "", "value": "", "className": "col-md-6", "readonly": false, "labelBold": true, "labelItalic": false, "labelUnderline": false, "required": true, "isMultiLine": false, "isInteger": false, "decimalPlace": 0, "isTodayValue": false, "dateFormat": "dd/mm/yy", "isNowTimeValue": false, "timeFormat": "HH:mm", "isMultiple": false, "isAjax": false, "dataOptions": [], "ajaxDataUrl": "", "isChecked": false } ] } ], "labelPosition": "top", "isDynamic": false, "minInstance": 1, "maxInstance": 0, "instances": [] } ], "layout": "tab", "_uniqueId": 0.8719504664016076 } }
//
//   hermes
//     .authenticate('alissonfpmorais@gmail.com', '1234')
//     .then(authRes => {
//       console.log(`Token: ${authRes.data.token}`)
//
//       hermes.forms.model
//         .create(authRes.data.token, formBuilder)
//         .then(createRes => console.log(createRes))
//         .catch(createErr => console.log(createErr))
//     })
//     .catch(authErr => console.log(authErr))
// }

module.exports = function (params) {
  return createClient(params)
}
