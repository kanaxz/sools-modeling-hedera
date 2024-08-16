const mixer = require('sools-core/mixer')
const Eventable = require('sools-core/mixins/Eventable')
const Destroyable = require('sools-core/mixins/Destroyable')

module.exports = mixer.mixin([Destroyable, Eventable], (base) => {
  return class Transformable extends base {
    transform(to) {
      this.emit('transformed', [to])
      this.destroy()
    }
  }
})

