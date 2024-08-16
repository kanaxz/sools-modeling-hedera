const mixer = require('sools-core/mixer')
const Destroyable = require('sools-core/mixins/Destroyable')

module.exports = mixer.mixin([Destroyable], (base) => {
  const references = []
  return class Referenceable extends base {
    static references = references
    constructor(...args) {
      super(...args)
      references.push(this)
    }

    destroy() {
      const index = references.indexOf(this)
      references.splice(index, 1)
      return super.destroy()
    }
  }

})
  .define()

