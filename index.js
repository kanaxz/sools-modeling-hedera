require('./components')
require('./form')
const mixer = require('sools-core/mixer')
const { onBindingDestroyed, onBindingGetProperty } = require('sools-hedera/set/BindingFunction')
const BaseHoldable = require('sools-modeling-client/mixins/holding/BaseHoldable')

onBindingGetProperty((binding, value) => {
  if (!mixer.is(value, BaseHoldable)) { return }
  if (!binding.holdables) {
    binding.holdables = []
  }
  binding.holdables.push(value)
  value.hold(binding)
})

onBindingDestroyed((binding) => {
  binding.holdables?.forEach((h) => h.release(binding))
})