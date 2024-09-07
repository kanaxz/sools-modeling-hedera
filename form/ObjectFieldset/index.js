const template = require('./template.html')
const { String, Bool, Model, Object: ObjectType, Number } = require('sools-modeling/types')
const { StringField, BoolField, DateField, NumberField, MarkdownField } = require('../../fields')
const ModelField = require('../ModelField')
const Field = require('../../fields/Field')
const { Markdown } = require('sools-modeling/types')
const ignore = ['@type']
require('./style.scss')

const typesFieldmapping = [
  [Markdown, MarkdownField],
  [String, StringField],
  [Bool, BoolField],
  [Number, NumberField],
  [Model, ModelField],
]

const getMapping = (type) => {
  return typesFieldmapping.find(([t]) => type === t || type.prototype instanceof t)
}

class ObjectFieldset extends Field {
  static typesFieldmapping = typesFieldmapping

  onStateChanged(newState, oldState) {
    if (newState) {
      this.types = newState.property.type
        .getAllChilds()
        .filter((c) => !c.definition.abstract)
    } else {
      this.types = []
    }
    return super.onStateChanged(newState, oldState)
  }

  async onValueChanged() {
    let fields = []
    if (this.state?.value) {
      const properties = this.state.currentType.properties
      fields = Object.entries(this.state.states)
        .filter(([p]) => ignore.indexOf(p) === -1)
        .map(([propertyName, state]) => {
          const property = properties.find((p) => p.name === propertyName)
          const mapping = getMapping(property.type)
          const fieldType = mapping[1]
          const field = new fieldType({
            state,
            childForm: this.childForm,
            fieldset: this,
            form: this.form,
          })
          field.addEventListener('changed', this.b(this.onFieldChanged))
          return field
        })
    }
    await this.set({
      fields
    })
  }

  focus() {
    const firstField = this.querySelector('input')
    if (firstField) {
      firstField.focus()
    }
  }

  async create() {
    const type = this.types[0]
    await this.setValue(new type())
    this.focus()
  }

  onSelectedTypeChanged(typeName) {
    const type = this.types.find((t) => t.definition.name === typeName)
    if (this.value?.constructor === type) { return }

    const value = new type()
    Object.assign(value, this.value)
    this.setValue(value)
  }

  onFieldChanged() {
    this.touched = true
    this.event('changed', { field: this })
  }

  showErrors() {
    this.touched = true
    this.fields.forEach((field) => {
      if (field.showErrors) {
        field.showErrors()
      } else {
        field.touched = true
      }
    })
  }

}

typesFieldmapping.push([ObjectType, ObjectFieldset])

ObjectFieldset
  .define({
    name: 'object-fieldset',
    template,
  })
  .properties({
    types: 'any',
    fields: 'any',
  })

module.exports = ObjectFieldset