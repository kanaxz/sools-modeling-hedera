require('sools-modeling-client/setup')
const hederaSetup = require('sools-hedera/setup')
const Holder = require('sools-modeling-client/mixins/holding/Holder')
const setup = require('sools-modeling/setup')
const StateMixin = require('./StateMixin')
setup.state.push(StateMixin)

hederaSetup.base.push(Holder)

module.exports = {
  routing: require('./routing/setup')
}