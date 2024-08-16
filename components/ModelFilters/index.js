const Component = require('sools-hedera/Component')
const template = require('./template.html')
const componentsService = require('../../componentsService')
const Array = require('sools-core/types/Array')
const Any = require('./Any')
require('./style.scss')

module.exports = class ModelFilters extends Component {

  onReady() {
    this.on('propertyChanged:type', this.b(this.onTypeChanged))
    this.refresh()
  }

  onTypeChanged() {
    this.refresh()
  }

  refresh() {
    this.anys = new Array(new Any())
  }

}
  .define({
    name: 'model-filters',
    template,
  })
  .properties({
    anys: 'any',
    type: 'any',
  })
