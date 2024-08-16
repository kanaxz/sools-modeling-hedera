const Component = require('sools-hedera/Component')
const template = require('./template.html')
require('./style.scss')

module.exports = class ModelFiltersAny extends Component {

  onReady() {
    this.root = this.closest('model-filters')
  }
}
  .define({
    name: 'model-filters-any',
    template,
  })