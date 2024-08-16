const { Model } = require('sools-modeling/types')
const ModelComponent = require('../ModelComponent')
const template = require('./template.html')
const Pageable = require('sools-modeling/mixins/Pageable')
const { navigator } = require('sools-hedera/global')
const mixer = require('sools-core/mixer')
require('./style.scss')

module.exports = class Card extends ModelComponent {

}
  .define({
    name: 'model-card',
    template,
    type: 'card',
  })
  .variables({
    Pageable,
    navigator,
    mixer,
  })
  .register(Model, 'card')