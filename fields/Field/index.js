const { components: { Interface } } = require('sools-hedera/global')
const Array = require('sools-core/types/Array')
const template = require('./template.html')
require('./style.scss')

module.exports = class Field extends Interface {
  constructor(values = {}) {
    super()
    Object.assign(this, values)
  }

  async onInit() {
    this.on('propertyChanged:state', this.b(this.onStateChanged))
    await this.onStateChanged(this.state)
  }

  async onStateChanged(newState, oldState) {
    if (oldState) {
      this.off(oldState, 'propertyChanged:value', this.b(this.onValueChanged))
    }

    if (newState) {
      this.on(newState, 'propertyChanged:value', this.b(this.onValueChanged))
    }

    await this.onValueChanged()
  }

  onValueChanged() {

  }

  message(text) {
    const msg = {
      text,
      start: new Date()
    }
    this.state.messages.push(msg)
    setTimeout(() => {
      this.state.messages.tryRemove(msg)
    }, 5000)
  }

  getValue() {
    return this.value
  }

  async setValue(value) {
    await this.state.setValue(value)
    this.touched = -1
    this.event('changed', { field: this })
  }
}
  .define({
    template,
  })
  .properties({
    header: 'any',
    state: 'any',
    touched: 'any',
  })