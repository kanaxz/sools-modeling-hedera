const { Password, String } = require('sools-modeling/types')
const Field = require('../../Field')
const template = require('./template.html')
require('./style.scss')

const map = [
  [Password, 'password'],
  [String, 'text']
]

module.exports = class TextField extends Field {
  onInit() {
    this.type = map.find(([t]) => {
      const type = this.state.property.type
      return type === t || type.prototype instanceof t
    })[1]
  }

  setValue(value) {
    console.log('setting value', value)
    super.setValue(value)
    this.showValues = !value
  }
}
  .define({
    name: 'string-field',
    template,
  })
  .properties({
    showValues: 'any'
  })