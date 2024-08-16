const mixer = require('sools-core/mixer')
const Propertiable = require('sools-core/mixins/Propertiable')

module.exports = mixer.mixin([Propertiable], (base) => {
  return class extends base {

    reset(){
      super.reset()
      this.readOnly = false
      this.hidden = false
    }
  }
})
  .define()
  .properties({
    hidden: 'any',
    readOnly: 'any',
  })