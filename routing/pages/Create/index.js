const Page = require('sools-hedera/page/Page')
const template = require('./template.html')
const defaultImage = require('../../assets/defaultImage.jpg')
const navigator = require('@app/navigator')
const { Entity } = require('starbor/types')

require('./style.scss')

module.exports = class CreateEntityPage extends Page {
  async onSaved({ model }) {
    await navigator.navigate(model.url)
  }
}
  .define({
    name: 'entity-create-page',
    template,
  })
  .variables({
    defaultImage,
    Entity
  })
  .properties({
    entity: 'any',
    canDelete: 'any',
  })