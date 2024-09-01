const Component = require('sools-hedera/Component')
const template = require('./template.html')
const context = require('sools-core-client/context')
const RootObjectState = require('sools-modeling/states/RootObjectState')
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
    const { value } = this
    console.log(value)
    this.state = new RootObjectState({
      property: {
        type: value.constructor,
      },
      value,
      required: true,
      context,
    })
  }

  async onReady() {
    await this.updateStates()
  }

  async updateStates() {
    await this.state.applyLogics()

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
  })


