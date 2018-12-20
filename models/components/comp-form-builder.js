const argumentError = require('../../error.js')

const merge = (parent, child, excludesFromParent, childKeyName) => {
  const p = excludesFromParent.reduce((acc, exclude) => {
    delete acc[exclude]
    return acc
  }, JSON.parse(JSON.stringify(parent)))

  return Object.keys(p).reduce((acc, key) => {
    acc[`${childKeyName}-#-${key}-@-${typeof(p[key])}`] = p[key]
    return acc
  }, JSON.parse(JSON.stringify(child)))
}

const parseFromControls = (formBuilder) => {
  return formBuilder.data.sections.reduce((accSection, section) => {
    const resSection = section.rows.reduce((accRow, row) => {
      const resRow = row.controls.map(control => {
        control = merge(formBuilder.data, control, ['sections'], 'data')
  			control = merge(section, control, ['rows'], 'section')
  			control = merge(row, control, ['controls'], 'row')

  			return control
      })

      return accRow.concat(resRow)
    }, [])

    return accSection.concat(resSection)
  }, [])
}

const parseToFields = (controls) => {
  return controls.map(control => {
    const field = { name: 'form-builder', code: 'FB-0001' }
    const details = Object.keys(control)
      .map(key => ({ key: key, value: control[key] }))

    field.details = details

    return field
  })
}

const parseToForm = (formBuilder) => {
  const controls = parseFromControls(formBuilder)
  const fields = parseToFields(controls)

  return { name: formBuilder.title, fields: fields }
}

const buildObjectFrom = (details, isValid, compute) => {
  return JSON.parse(JSON.stringify(details))
    .filter(detail => isValid(detail))
    .reduce((acc, detail) => compute(acc, detail), {})
}

const mutateObject = (parent, parentKey, child) => {
  if (!parent[parentKey]) {
    parent[parentKey] = [child]
  } else if (parent[parentKey][parent[parentKey].length - 1].name !== child.name) {
    parent[parentKey] = parent[parentKey].concat(child)
  }

  return parent[parentKey][parent[parentKey].length - 1]
}

const parseFromFields = (fields) => {
  return fields.reduce((accField, field) => {
    const acceptWith = (prefix) => ((detail) => detail.key.startsWith(prefix))
    const rejectWith = (prefixes) => ((detail) => {
      return !prefixes.reduce((acc, prefix) => acc || detail.key.startsWith(prefix), false)
    })
    const computeAccept = (kindSeparator, typeSeparator) => ((acc, detail) => {
      const key = (detail.key.split(kindSeparator)[1]).split(typeSeparator)[0]
      const type = detail.key.split(typeSeparator)[1]

      if (type === 'number') {
        acc[key] = Number(detail.value[0])
      } else if (type === 'boolean' && detail.value[0] === 'false') {
        acc[key] = false
      } else if (type === 'boolean' && detail.value[0] === 'true') {
        acc[key] = true
      } else {
        acc[key] = detail.value[0]
      }

      return acc
    })
    const computeReject = (kindSeparator, typeSeparator) => ((acc, detail) => {


      acc[detail.key] = detail.value[0]
      return acc
    })

    const section = buildObjectFrom(field.details, acceptWith('section-#-'), computeAccept('-#-', '-@-'))
    const row = buildObjectFrom(field.details, acceptWith('row-#-'), computeAccept('-#-', '-@-'))
    const control = buildObjectFrom(field.details, rejectWith(['data-#-', 'section-#-', 'row-#-']), computeReject)

    if (!accField.data) accField.data = buildObjectFrom(field.details, acceptWith('data-#-'), computeAccept('-#-', '-@-'))

    const lastSection = mutateObject(accField.data, 'sections', section)
    const lastRow = mutateObject(lastSection, 'rows', row)
    mutateObject(lastRow, 'controls', control)

    return accField
  }, {})
}

const parseFromForm = (form) => {
  const builder = parseFromFields(form.fields)
  builder.id = form.id
  builder.title = form.name

  return builder
}

module.exports = { parseToForm, parseFromForm }
