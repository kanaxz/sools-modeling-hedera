const mixer = require('sools-core/mixer')
const Pageable = require('sools-modeling/mixins/Pageable')
const { Model } = require('sools-modeling/types')
const LayoutRouter = require('sools-hedera/routing/routers/LayoutRouter')
const { actions } = require('./setup')

const types = Model.getAllChilds()
  .filter((t) => mixer.is(t.prototype, Pageable))
  .filter((t) => !t.definition.abstract)

const url = new RegExp(`/(${types.map((t) => t.definition.name).join('|')})/([\\d|\\w|-]*)`)

module.exports = class ModelingRouter extends LayoutRouter {
  constructor(options) {
    super({
      url,
      layout: (req) => [options.layout || import('./ModelLayout'), { model: req.model }],
    })

    this.registerActions()
  }

  async onMatch(req, res, next) {
    const typeName = req.match[1]
    const code = req.match[2]
    const type = types.find((t) => t.definition.name === typeName)
    const { codeField } = type.definitions.find((d) => d.codeField)
    const model = await type.collection.findByUniqueIndex({
      [codeField]: code,
      '@type': typeName,
    }, {
      type: type.definition.name,
    })
    if (!model) {
      return res.notFound()
    }
    Object.assign(req, {
      type,
      model
    })
    return super.onMatch(req, res, next)
  }

  registerActions() {
    actions
      .filter((action) => action.url !== undefined)
      .forEach((action) => {
        this.route(action.url, async (req, res, next) => {
          await action.check(req.model)
          await action.execute(req, res, next)
          document.title = `${req.model.constructor.definition.name} ${req.model.toString()} - ${action.name}`
        })
      })
  }
}