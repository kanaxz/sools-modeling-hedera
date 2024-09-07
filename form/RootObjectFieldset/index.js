const Component = require('sools-hedera/Component')
const template = require('./template.html')
const context = require('sools-core-client/context')
const ObjectState = require('sools-modeling/stating/ObjectState')
require('./style.scss')

const applyStates = (targetStates, statesPatch) => {
  Object.entries(statesPatch)
    .forEach(([k, patch]) => {
      const target = targetStates[k]
      Object.assign(target, patch)
      if (patch.states) {
        applyStates(target.states, patch.states)
      }
    })
}


module.exports = class RootObjectForm extends Component {
  constructor(values = {}) {
    super()
    Object.assign(this, values)
  }

  async onInit() {
    this.on('propertyChanged:value', this.b(this.onValueChanged))
    this.onValueChanged()
  }

  async onValueChanged() {

    const { value } = this
    if (!value) {
      this.state = null
      return
    }

    this.state = new ObjectState({
      property: {
        type: value.constructor,
      },
      value,
      required: true,
    })

    await this.updateStates()
  }

  async onReady() {
    await this.updateStates()
  }

  async updateStates() {
    if (!this.state) { return }

    if (this.states) {
      applyStates(this.state.states, this.states)
    }
    await this.state.validate()
  }

  async onFieldsetChanged() {
    await this.updateStates()
    this.fieldset.showErrors()
  }
}
  .define({
    name: 'root-object-fieldset',
    template,
  })
  .properties({
    value: 'any',
    type: 'any',
    mode: 'any',
    state: 'any',
  })


