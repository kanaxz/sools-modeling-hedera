const Component = require('sools-hedera/Component')
const template = require('./template.html')
const { navigator } = require('sools-hedera/global')
require('./style.scss')

module.exports = class ModelEditPage extends Component {
  constructor(model){
    super()
    this.model = model
  }
  async onSaved({ model }) {
    await navigator.navigate(model.url)
  }

}
  .define({
    name: 'model-edit-page',
    template,
  })